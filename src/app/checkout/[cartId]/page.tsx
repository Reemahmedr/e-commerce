import CheckoutForm from "@/src/components/CheckoutForm";

interface pageProp {
  params: { cartId: string };
}
export default async function page({ params }:pageProp) {
  const { cartId } = await params;

  return (
    <>
      <CheckoutForm cartId={cartId}></CheckoutForm>
    </>
  );
}
