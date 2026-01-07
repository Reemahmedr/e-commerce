"use client";
import { RemoveFromWishlist } from "@/src/apis/wishlist/DeleteItemFromWishList.api";
import AddToCartBtn from "@/src/components/AddToCartBtn";
import { wishlistInterfcae } from "@/src/interfaces/wishList.interface";
import Loading from "@/src/loading/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import emptyWishlist from "@/public/empty wishlist.jpg";

export default function page() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<wishlistInterfcae>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const data = await fetch(`/api/wishlist`);
      const payLoad = await data.json();
      return payLoad;
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: RemoveFromWishlist,
    onSuccess: (data, variable) => {
      toast.success(
        data?.message || "Product removed from wishlist successfully"
      );

      const wishlistItems = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      const updatedWishlist = wishlistItems.filter(
        (itemId: string) => itemId !== variable
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove product from wishlist");
    },
  });

  const [loadingId, setLoadingId] = useState<null | string>(null);

  function handleDeleteItem(id: string) {
    setLoadingId(id);
    delMutate(id);
  }

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      {data?.count == 0 ? (
        <>
          <div className="flex justify-center my-9 text-5xl capitalize">
            <h2 className="font-extrabold">
              Your Wishlist is waiting for you 😎
            </h2>
          </div>
          <div className="flex justify-center bg-center bg-cover my-24">
            <Image
              src={emptyWishlist}
              alt="empty wish list image"
              className=""
            />
          </div>
        </>
      ) : (
        <>
          <div className="title my-9 text-5xl">
            <div className="flex justify-center py-3">
              <i className="fa-regular fa-heart" />
            </div>
            <div className="flex justify-center">
              <h2 className="font-extrabold">My Wishlist</h2>
            </div>
          </div>
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded-2xl my-5 ">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((prod) => (
                  <>
                    <tr className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                      <td className="p-4 flex items-center space-x-4">
                        <i
                          onClick={() => handleDeleteItem(prod._id)}
                          className={`${
                            loadingId === prod._id
                              ? "fa-solid fa-circle-notch fa-spin"
                              : "fa-solid fa-trash-can"
                          } text-lg text-red-500 cursor-pointer`}
                        />

                        <Image
                          width={100}
                          height={100}
                          src={prod.imageCover}
                          className="w-16 md:w-24 max-w-full max-h-full rounded-2xl"
                          alt="product image"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-heading text-center">
                        {prod.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-heading text-center">
                        {prod.price} EGP
                      </td>
                      <td className="px-6 py-4 font-semibold text-heading text-center">
                        {prod.brand.name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-heading text-center">
                        {prod.ratingsAverage}{" "}
                        <i className="fa-solid fa-star text-yellow-300" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-heading text-center">
                        {prod.quantity === 0 ? (
                          <p className="text-red-400">❌ Out of stock</p>
                        ) : (
                          <p className="text-green-300">✅ In stock</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <AddToCartBtn productId={prod._id}></AddToCartBtn>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
