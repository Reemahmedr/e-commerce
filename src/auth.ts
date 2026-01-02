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
            const userId = payload.user?._id || payload.user?.id;
            return {
              id: payload.user._id,
              email: payload.user?.email,
              name: payload.user?.name,
              token: payload.token,
            } as User;
          }

          throw new Error(payload.message || "Invalid credentials");
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Login failed"
          );
        }
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user && user?.id) {
        token.token = user.token;
        token.userId = user.id;
      }
      return token;
    },

    session: ({ session, token }) => {
      session.token = token.token as string;
      session.userId = token.userId as string;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};
