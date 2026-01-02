import Image from "next/image";
import AddToCartBtn from "./AddToCartBtn";
import { ProductInterface } from "../interfaces/product.interface";

export default function ProductDeatailsComp({
  data,
}: {
  data: ProductInterface;
}) {
  return (
    <div className="flex flex-wrap items-center">
      <div className="md:w-1/3">
        <Image
          width={1000}
          height={300}
          src={data.imageCover}
          className="w-full h-[300px] object-cover my-5"
          alt="product image cover"
        />
        <ul className="flex flex-wrap gap-5 justify-center">
          {data.images.map((image) => (
            <li>
              <img src={image} width={80} alt="carsole images" />
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-2/3">
        <p className="my-2 font-bold  text-[#AFD543]">{data.title}</p>
        <p className="">{data.description}</p>
        <div className="flex justify-between items-center">
          <div className="price my-2">
            <p
              className={
                data.priceAfterDiscount ? "line-through text-red-600" : ""
              }
            >
              {data.price} EGP
            </p>
            {data.priceAfterDiscount ? (
              <p>{data.priceAfterDiscount} EGP</p>
            ) : (
              ""
            )}
          </div>
          <p>
            {data.ratingsAverage}{" "}
            <i className="fa-solid fa-star text-amber-300"></i>
          </p>
        </div>
        <AddToCartBtn productId={data?._id}></AddToCartBtn>
      </div>
    </div>
  );
}
