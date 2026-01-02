"use client";
import { Button } from "@/components/ui/button";
import { AddToCart } from "../apis/cart/AddToCart.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AddToCartBtn({ productId }: { productId: string }) {
  const queryClient = useQueryClient()
  const { isPending, mutate } = useMutation({
    mutationFn: AddToCart,
    onSuccess: (data) => {
      toast.success(data?.message || "Product added to cart successfully");
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add product to cart");
    },
  });

  return (
    <div>
      <Button
        onClick={() => {
          mutate(productId);
        }}
        disabled={isPending}
        className="cursor-pointer my-4 w-full"
      >
        {isPending ? "Adding..." : "Add To Cart"}
      </Button>
    </div>
  );
}
