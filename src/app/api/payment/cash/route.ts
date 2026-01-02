import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cartId, shippingAddress } = await req.json();

    if (!cartId) {
      return NextResponse.json(
        { status: "fail", message: "cartId is required" },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { status: "fail", message: "shippingAddress is required" },
        { status: 400 }
      );
    }

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { status: "fail", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const apiResponse = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          token: token.token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
        cache: "no-store",
      }
    );

    const payload = await apiResponse.json();

    if (!apiResponse.ok || payload.status === "fail") {
      return NextResponse.json(
        {
          status: "fail",
          message: payload.message || "Failed to create cash order",
        },
        { status: apiResponse.status || 500 }
      );
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Cash order error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
