import { getAllProducts } from "../apis/product/allProducts.api";
import { ProductInterface } from "../interfaces/product.interface";
import ProductItem from "./ProductItem";

export default async function FeaturedProducts() {
  const data: ProductInterface[] = await getAllProducts();

  if (!Array.isArray(data)) {
    return null;
  }
  return (
    <div className="flex flex-wrap my-5 ">
      {data?.map((product: ProductInterface) => (
        <ProductItem product={product} key={product._id}></ProductItem>
      ))}
    </div>
  );
}
