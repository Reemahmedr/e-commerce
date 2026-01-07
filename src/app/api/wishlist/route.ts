import { AuthToken } from "@/src/authToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await AuthToken();

  if (!token) {
    throw new Error("User is not authenticated. Please login first.");
  }

  try {
    const { productId } = await req.json();

    const apiResponse = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        cache: "no-store",
      }
    );

    const payload = await apiResponse.json();

    if (
      !apiResponse.ok ||
      payload.status === "fail" ||
      payload.status === "error"
    ) {
      return NextResponse.json(
        {
          status: "fail",
          message: payload.message || "Failed to sign up",
        },
        { status: apiResponse.status || 500 }
      );
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Error in /api/wishlist:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // const token = await getToken({ req });
  const token = await AuthToken();

  if (!token) {
    return NextResponse.json({ error: "unautherized", status: 401 });
  }

  const res = await fetch(`${process.env.API}/wishlist`, {
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

  const payLoad = await res.json();
  return NextResponse.json(payLoad);
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    // const token = await getToken({ req });
    const token = await AuthToken();

    if (!token) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Unauthorized - Please login to remove items from cart",
        },
        { status: 401 }
      );
    }

    const apiUrl = productId
      ? `${process.env.API}/wishlist/${productId}`
      : `${process.env.API}/wishlist`;

    const apiResponse = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const payload = await apiResponse.json();

    if (
      !apiResponse.ok ||
      payload.status === "fail" ||
      payload.status === "error"
    ) {
      return NextResponse.json(
        {
          status: "fail",
          message:
            payload.message ||
            (productId
              ? "Failed to remove product from cart"
              : "Failed to clear cart"),
        },
        { status: apiResponse.status || 500 }
      );
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Error in /api/wishlist DELETE:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
