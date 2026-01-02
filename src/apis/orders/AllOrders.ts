export async function ShowAllOrders() {
  const data = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to show all orders");
  }

  return payload.data;
}
