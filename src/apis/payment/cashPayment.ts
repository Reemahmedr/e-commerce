export async function CashPayment(
  cartId: string,
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  }
) {
  const response = await fetch(`/api/payment/cash`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({cartId , shippingAddress }),
  });

  const payload = await response.json();

  if (!response.ok || payload.status === "fail") {
    throw new Error(payload.message || "Cash order failed");
  }

  return payload;
}
