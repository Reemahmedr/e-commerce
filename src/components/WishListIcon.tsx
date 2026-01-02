"use client";

import { useEffect, useState } from "react";
import { AddProductToWishList } from "../apis/wishlist/AddProuctToWishList.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function WhishListIcon({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const [wishlist, setWishList] = useState(false);

  useEffect(() => {
    const wishlistItem = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isInWishlist = wishlistItem.includes(productId);
    setWishList(isInWishlist);
  }, [productId]);

  const { mutate } = useMutation({
    mutationFn: () => AddProductToWishList({ productId }),
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      toast.error("Failed to add product to your wishlist");
    },
  });

  async function handleWishListIcon(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const wishlistItems = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const isInWishlist = wishlistItems.includes(productId);

    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlistItems.filter((id: string) => id !== productId);
      setWishList(false);
      toast.success("product removed successfully from wishlist");
    } else {
      updatedWishlist = [...wishlistItems, productId];
      setWishList(true);
      toast.success("product added successfully to wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    mutate();
  }
  return (
    <>
      <div className="relative">
        <span className="absolute flex top-0 right-0 text-[20px] p-1.5">
          <i
            onClick={handleWishListIcon}
            className={`z-10 ${
              wishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"
            }`}
          />
        </span>
      </div>
    </>
  );
}
