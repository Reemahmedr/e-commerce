export async function getSpecificProducts(productId: string) {
  try {
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
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
