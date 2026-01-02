export async function ClearCart() {
  const response = await fetch(`/api/cart`, {
    method: "DELETE",
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
    throw new Error(payload.message || "Failed to remove products from cart");
  }

  return payload;
}
