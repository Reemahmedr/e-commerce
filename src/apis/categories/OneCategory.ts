export async function SingleCategory({ categoryId }: { categoryId: string }) {
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to show the category");
  }

  return payload.data;
}
