export async function getAllProducts() {
  try {
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products`,
      {
        cache: "no-store",
      }
    );
    const result = await data.json();
    return result?.data;
  } catch (error) {
    return error;
  }
}
