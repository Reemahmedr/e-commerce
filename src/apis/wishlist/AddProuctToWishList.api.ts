export async function AddProductToWishList({ productId }: { productId: string }) {
  const data = await fetch(`/api/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to send reset code");
  }

  return payload;
}
