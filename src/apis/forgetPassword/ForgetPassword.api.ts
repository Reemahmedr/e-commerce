export async function ForgetPassword({ email }: { email: string }) {
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to send reset code");
  }

  return payload;
}
