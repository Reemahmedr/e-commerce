export async function UserOrders({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {

  const url = `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to show the category");
  }

  return payload;
}
