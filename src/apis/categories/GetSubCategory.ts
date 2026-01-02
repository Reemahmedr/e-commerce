export async function GetSubCategory({ category}: { category: string }) {
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${category}/subcategories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to show the subcategory");
  }

  return payload;
}
