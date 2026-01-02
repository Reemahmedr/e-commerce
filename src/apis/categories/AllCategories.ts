export async function GetAllCategories() {
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to show all categories");
  }

  return payload;
}
