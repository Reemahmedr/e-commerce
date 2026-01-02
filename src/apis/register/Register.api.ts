interface register {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export async function Register({
  name,
  email,
  password,
  rePassword,
  phone,
}: register) {
  const response = await fetch("/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, rePassword, phone }),
  });

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error("Failed to parse server response. Please try again.");
  }

  if (!response.ok || payload.status === "fail" || payload.status === "error") {
    throw new Error(payload.message || "Failed to register");
  }

  return payload;
}
