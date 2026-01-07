"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function WhishListIcon({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await fetch("/api/wishlist");
      return res.json();
    },
    enabled: !!session,
  });

  const isInWishlist = wishlistData?.data?.some(
    (item: any) => item._id === productId || item.id === productId
  );

  // useEffect(() => {
  //   const wishlistItem = JSON.parse(localStorage.getItem("wishlist") || "[]");
  //   const isInWishlist = wishlistItem.includes(productId);
  //   setWishList(isInWishlist);
  // }, [productId]);

  // const { mutate } = useMutation({
  //   mutationFn: () => AddProductToWishList({ productId }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["wishlist"] });
  //   },
  //   onError: () => {
  //     toast.error("Failed to add product to your wishlist");
  //   },
  // });
  const { mutate: addToWishlist } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Failed to add");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Product added successfully to wishlist");
    },
    onError: () => {
      toast.error("Failed to add product to your wishlist");
    },
  });

  const { mutate: removeFromWishlist } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/wishlist?productId=${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Product removed successfully from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove product from wishlist");
    },
  });

  async function handleWishListIcon(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  }
  if (status === "loading") {
    return null;
  }

  if (!session) {
    return null;
  }
  return (
    <>
      <div className="relative">
        <span className="absolute flex top-0 right-0 text-[20px] p-1.5">
          <i
            onClick={handleWishListIcon}
            className={`z-10 ${
              isInWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"
            }`}
          />
        </span>
      </div>
    </>
  );
}
