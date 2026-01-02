import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function AuthToken() {
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
      console.log("No auth token found in cookies");
      return null;
    }

    const secret = process.env.NEXTAUTH_SECRET;

    if (!secret) {
      console.error("NEXTAUTH_SECRET is not configured");
      return null;
    }

    const token = await decode({
      token: authToken,
      secret: secret,
    });

    if (!token) {
      console.log("Token decode returned null");
      return null;
    }

    return token?.token || null;
  } catch (error) {
    console.error("Error decoding auth token:", error);
    return null;
  }
}
