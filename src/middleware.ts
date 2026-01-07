import { NextRequest, NextResponse } from "next/server";
import { AuthToken } from "./authToken";

export default async function proxy(req: NextRequest) {
  // const token = await getToken({ req });
  const token = await AuthToken();

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// protect any route i need to be authenticated as payment or wishlist or cart
export const config = {
  matcher: ["/cart", "/wishlist", "/payment"],
};
