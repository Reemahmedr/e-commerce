export async function OnlinePayment(
  cartId: string,
  shippingAddress: { details: string; city: string; phone: string }
) {
  const response = await fetch("/api/payment/checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartId, shippingAddress }),
  });

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error("Failed to parse server response. Please try again.");
  }

  if (!response.ok || payload.status === "fail" || payload.status === "error") {
    throw new Error(payload.message || "Failed to create checkout session");
  }

  return payload;
}
