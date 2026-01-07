"use client";
import { Button } from "@/components/ui/button";
import { ClearCart } from "@/src/apis/cart/ClearCart.api";
import { RemoveFromCart } from "@/src/apis/cart/RemoveFromCart.api";
import { UpdateCartItem } from "@/src/apis/cart/UpdateCart.api";
import ClearCartComp from "@/src/components/ClearCartComp";
import { CartResponse } from "@/src/interfaces/cart.interface";
import Loading from "@/src/loading/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await fetch("/api/cart");
      const payLoad = await data.json();
      return payLoad;
    },
  });
  const [loadingId, setLoadingId] = useState<null | string>(null);
  const [UpdateId, setUpdateId] = useState<null | string>(null);

  function handleDeleteItem(id: string) {
    setLoadingId(id);
    delMutate(id);
  }

  function handleUpdateItem(counter: number, productId: string) {
    updateMutate({ counter, productId });
    setUpdateId(productId);
  }

  const { mutate: delMutate, isPending: pend } = useMutation({
    mutationFn: RemoveFromCart,
    onSuccess: (data) => {
      toast.success(data?.message || "Product removed from cart successfully");
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove product from cart");
    },
  });

  //update mutation

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationFn: UpdateCartItem,
    onSuccess: (data) => {
      toast.success(data?.message || "Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // clear cart
  const { mutate: clearMutate, isPending: clearPending } = useMutation({
    mutationFn: ClearCart,
    onSuccess: () => {
      toast.success("Cart cleared successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to clear cart");
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return toast.error("cart not found");
  }

  return (
    <>
      {data?.numOfCartItems === 0 ? (
        <ClearCartComp></ClearCartComp>
      ) : (
        <div className="flex md:flex-nowrap flex-wrap items-start">
          <div className="relative mx-6 md:w-3/4 w-full overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border rounded-4xl my-5 border-default">
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
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.products?.map((prod) => (
                  <>
                    <tr className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                      <td className="p-4">
                        <img
                          src={prod.product.imageCover}
                          className="w-16 md:w-24 max-w-full max-h-full rounded-2xl"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-heading text-center">
                        {prod.product.title}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <form className="max-w-xs mx-auto">
                          <label htmlFor="counter-input-1" className="sr-only">
                            Choose quantity:
                          </label>
                          <div className="relative flex items-center">
                            <button
                              onClick={() =>
                                handleUpdateItem(
                                  prod.count - 1,
                                  prod.product._id
                                )
                              }
                              type="button"
                              id="decrement-button-1"
                              data-input-counter-decrement="counter-input-1"
                              className="cursor-pointer flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                            >
                              <svg
                                className="w-3 h-3 text-heading"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 12h14"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="counter-input-1"
                              data-input-counter=""
                              className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-10 text-center"
                              placeholder=""
                              value={
                                updatePending && prod.product._id == UpdateId
                                  ? ""
                                  : `${prod.count}`
                              }
                              required
                            />
                            <button
                              onClick={() =>
                                handleUpdateItem(
                                  prod.count + 1,
                                  prod.product._id
                                )
                              }
                              type="button"
                              id="increment-button-1"
                              data-input-counter-increment="counter-input-1"
                              className="flex items-center cursor-pointer  justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                            >
                              <svg
                                className="w-3 h-3 text-heading"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 12h14m-7 7V5"
                                />
                              </svg>
                            </button>
                          </div>
                        </form>
                      </td>
                      <td className="px-6 py-4 font-semibold text-heading text-center">
                        {prod.price} EGP
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          onClick={() => handleDeleteItem(prod.product._id)}
                          className="font-medium cursor-pointer text-red-600"
                        >
                          {pend && prod.product._id == loadingId ? (
                            "Deleting..."
                          ) : (
                            <span>
                              Delete <i className="fa-regular fa-trash-can" />
                            </span>
                          )}
                        </span>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full md:w-1/4 my-5">
            <div className="overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border rounded-4xl border-default">
              <div className="inner p-2">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-center items-center text-gray-600">
                    <h2 className="font-semibold text-2xl">Booking Summary</h2>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span></span>
                    <span className="font-semibold"></span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900 m-auto">
                      Total cart price: {data?.data.totalCartPrice}
                    </p>
                    <span className="text-2xl font-bold text-[#003262]"></span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900 m-auto">
                      Number of cart items: {data?.numOfCartItems}
                    </p>
                  </div>
                </div>
                <div className="btn flex justify-center mb-3">
                  <Link
                    href={`/checkout/${data?.cartId}`}
                    className="cursor-pointer text-center w-3/4 text-2xl"
                  >
                    <Button>
                      <i className="fas fa-credit-card mr-2" />
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="btn flex justify-center mt-16">
              <Button
                onClick={() => clearMutate()}
                disabled={clearPending}
                className="cursor-pointer text-center w-3/4 text-lg mb-3  bg-transparent text-red-600 border border-red-600 hover:bg-transparent"
              >
                <i className="fas fa-trash-alt mr-2" />
                {clearPending ? "Clearing..." : "Clear Cart"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
