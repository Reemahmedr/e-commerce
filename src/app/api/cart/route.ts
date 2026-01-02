import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { status: "fail", message: "productId is required" },
        { status: 400 }
      );
    }

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Unauthorized - Please login to add items to cart",
        },
        { status: 401 }
      );
    }

    const apiResponse = await fetch(`${process.env.API}/cart`, {
      method: "POST",
      headers: {
        token: token.token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
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
          message: payload.message || "Failed to add product to cart",
        },
        { status: apiResponse.status || 500 }
      );
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Error in /api/cart:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "unautherized", status: 401 });
  }

  const res = await fetch(`${process.env.API}/cart`, {
    headers: {
      token: token.token as string,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payLoad = await res.json();
  return NextResponse.json(payLoad);
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const token = await getToken({ req });
    console.log("TOKEN SENT TO API:", token?.token);

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
      ? `${process.env.API}/cart/${productId}`
      : `${process.env.API}/cart`;

    const apiResponse = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token.token as string,
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
    console.error("Error in /api/cart DELETE:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { productId, counter } = await req.json();

    if (!productId || counter == null) {
      return NextResponse.json(
        { status: "fail", message: "productId and counter are required" },
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
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.append("token", token.token as string);

    const apiResponse = await fetch(`${process.env.API}/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token.token as string,
      },
      body: JSON.stringify({ count: counter }),
      cache: "no-store",
    });

    const payload = await apiResponse.json();

    if (
      !apiResponse.ok ||
      payload.status === "fail" ||
      payload.status === "error"
    ) {
      return NextResponse.json(
        { status: "fail", message: payload.message || "Failed to update cart" },
        { status: apiResponse.status || 500 }
      );
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Error in /api/cart PUT:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
