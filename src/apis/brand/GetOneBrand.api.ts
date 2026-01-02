export async function GetOneBrand({ brandId }: { brandId: string }) {
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to show the brand");
  }

  return payload.data;
}
