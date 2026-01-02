"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import freshCart from "@/public/freshcartlogoslogan.png";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { CartResponse } from "../interfaces/cart.interface";
import { wishlistInterfcae } from "../interfaces/wishList.interface";

export default function Navbar() {
  const links = [
    { path: "/products", content: "products" },
    { path: "/brand", content: "brand" },
    { path: "/categories", content: "categories" },
    { path: "/allorders", content: "Orders" },
  ];
  const auth = [
    { path: "/login", content: "login" },
    { path: "/register", content: "register" },
  ];

  const { data } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await fetch("/api/cart");
      const payLoad = await data.json();
      return payLoad;
    },
  });

  const { data: wishlitData } = useQuery<wishlistInterfcae>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const data = await fetch(`/api/wishlist`);
      const payLoad = await data.json();
      return payLoad;
    },
  });

  const [toggle, setToggle] = useState(true);

  const { data: session, status } = useSession();

  function handleToggle() {
    setToggle(!toggle);
  }

  function handleLogout() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <>
      <nav className="bg-neutral-primary  w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-7xl flex gap-10 md:flex-nowrap flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {" "}
            <Image width={150} src={freshCart} alt=""></Image>
          </Link>
          <button
            onClick={handleToggle}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
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
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          <div
            className={`${toggle && "hidden"} w-full md:flex justify-between`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {links.map((ele) => (
                <li>
                  <Link
                    key={ele.content}
                    href={ele.path}
                    className="block uppercase py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                  >
                    {ele.content}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="font-medium uppercase flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {status === "authenticated" ? (
                <>
                  {session?.user?.name && (
                    <li>
                      <p className="capitalize">
                        HI {session?.user?.name} <span>👋</span>
                      </p>
                    </li>
                  )}
                  <li>
                    <Link href={"/cart"}>
                      <div className="relative inline-block group">
                        <div className="relative">
                          <i className="fas fa-shopping-cart text-2xl text-gray-700 group-hover:scale-110 transition-transform duration-200"></i>
                          <>
                            <span className="absolute -top-2 -right-2 bg-linear-to-r from-teal-500 to-teal-600 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-md border-2 border-white transform group-hover:scale-110 transition-transform duration-200 z-10">
                              {(data?.numOfCartItems ?? 0) > 9
                                ? "9+"
                                : data?.numOfCartItems ?? 0}
                            </span>
                          </>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/wishlist"}>
                      <div className="relative inline-block group">
                        <div className="relative">
                          <i className="fa-regular fa-heart text-2xl text-gray-700 group-hover:scale-110 transition-transform duration-200"></i>
                          <>
                            <span className="absolute -top-2 -right-2 bg-linear-to-r from-teal-500 to-teal-600 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-md border-2 border-white transform group-hover:scale-110 transition-transform duration-200 z-10">
                              {(wishlitData?.count ?? 0) > 9
                                ? "9+"
                                : wishlitData?.count ?? 0}
                            </span>
                          </>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li
                    className="capitalize cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  {auth.map((ele) => (
                    <li>
                      <Link
                        key={ele.content}
                        href={ele.path}
                        className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                      >
                        {ele.content}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
