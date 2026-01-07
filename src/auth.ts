import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const response = await fetch(`${process.env.API}/auth/signin`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const payload = await response.json();

          if (payload.message === "success") {
            // const userId = payload.user?._id || payload.user?.id;
            const userId =
              payload.user?._id || payload.user?.id || payload.userId;
            return {
              // id: payload.user._id,
              id: userId || "temp-id",
              email: payload.user?.email,
              name: payload.user?.name,
              token: payload.token,
            } as User;
          }

          // throw new Error(payload.message || "Invalid credentials");
          else {
            return null;
          }
        } catch (error) {
          // throw new Error(
          //   error instanceof Error ? error.message : "Login failed"
          // );
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user && user.token) {
        // token.token = user.token;
        // token.userId = user.id;
        token.userId = token.sub || user.id;
        token.accessToken = user.token;
      }
      return token;
    },

    //  if (account?.access_token) {
    // هنا بنحط التوكن اللي RouteMisr محتاجه
    // token.accessToken = account.access_token;
    // }
    // return token;

    session: ({ session, token }) => {
      // session.token = token.token as string;
      session.token = token.accessToken as string;
      session.userId = token.userId as string;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};
