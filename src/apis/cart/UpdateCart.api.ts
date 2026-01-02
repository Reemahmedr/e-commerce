
export async function UpdateCartItem({
  productId,
  counter,
}: {
  productId: string;
  counter: number;
}) {
  const response = await fetch(`/api/cart`, {
    method: "PUT",
    body: JSON.stringify({ counter , productId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error("Failed to parse server response. Please try again.");
  }

  if (!response.ok || payload.status === "fail" || payload.status === "error") {
    throw new Error(payload.message || "Failed to update product from cart");
  }

  return payload;
}
