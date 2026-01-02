export async function GetAllBrand() {
  const data = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await data.json();

  if (payload.message === "fail") {
    throw new Error(payload.message || "Failed to show all brands");
  }
  

  return payload;
}
