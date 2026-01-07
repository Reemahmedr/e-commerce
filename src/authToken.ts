import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function AuthToken(req?:NextRequest) {
  try {
    // const authToken = (await cookies()).get("next-auth.session-token")?.value;

    // if (!authToken) {
    //   return null;
    // }
    const cookieStore = await cookies();
    const cookieName =
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

    const authToken = cookieStore.get(cookieName)?.value;


    if (!authToken) {
      return null;
    }

    const secret = process.env.NEXTAUTH_SECRET;

    if (!secret) {
      return null;
    }

    const token = await decode({
      token: authToken,
      secret: secret,
    });

    if (!token) {
      return null;
    }

    // return token.token; // 8yrna da mn token.token ll token.accessToken
    return token.accessToken as string;
    // return authToken
  } catch (error) {
    return null;
  }
}
