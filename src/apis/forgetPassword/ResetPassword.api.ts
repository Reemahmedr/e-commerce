export async function ResetPasswordToNew({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) {
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    }
  );
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to send reset code");
  }

  return payload;
}
