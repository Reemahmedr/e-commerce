import { getSpecificProducts } from "@/src/apis/product/specificProduct.api";
import ProductDeatailsComp from "@/src/components/ProductDeatailsComp";
import { ProductInterface } from "@/src/interfaces/product.interface";
import Loading from "@/src/loading/Loading";
import { Suspense } from "react";

interface productProps {
  params: { id: string };
}

export default async function page({ params }: productProps) {
  const { id } = await params;
  const data: ProductInterface = await getSpecificProducts(id);
  return (
    <Suspense fallback={<Loading></Loading>}>
      <ProductDeatailsComp data={data}></ProductDeatailsComp>
    </Suspense>
  );
}
