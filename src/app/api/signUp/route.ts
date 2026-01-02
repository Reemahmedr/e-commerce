import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, rePassword, phone } = await req.json();

    const apiResponse = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
        rePassword,
          phone 
        }),
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
    console.error("Error in /api/signup:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
