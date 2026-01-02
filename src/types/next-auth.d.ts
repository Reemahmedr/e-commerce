import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    userId?: string;
    token?: string;
  }

  interface User {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    token?: string;
  }
}
