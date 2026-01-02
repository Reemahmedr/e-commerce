import { ProductInterface } from "./../interfaces/product.interface";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import Image from "next/image";
import WishListIcon from "./WishListIcon";

export default function ProductItem({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <div className="product-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-3 ">
      <Link href={`/productdetails/${product._id}`}>
        <div className="item relative">
          <WishListIcon productId={product._id}></WishListIcon>
          <Image
            width={1000}
            height={300}
            src={product.imageCover}
            className="w-full h-[300px] object-cover rounded-2xl"
            alt="product image cover"
          />
          <p className="my-2 font-bold line-clamp-1 text-[#AFD543]">
            {product.title}
          </p>
          <p className="line-clamp-1">{product.description}</p>
          <div className="flex justify-between items-center">
            <div className="price my-2">
              <p
                className={
                  product.priceAfterDiscount ? "line-through text-red-600" : ""
                }
              >
                {product.price} EGP
              </p>
              {product.priceAfterDiscount ? (
                <p>{product.priceAfterDiscount} EGP</p>
              ) : (
                ""
              )}
            </div>
            <p>
              {product.ratingsAverage}{" "}
              <i className="fa-solid fa-star text-amber-300"></i>
            </p>
          </div>
        </div>
      </Link>
      <AddToCartBtn productId={product._id}></AddToCartBtn>
    </div>
  );
}
