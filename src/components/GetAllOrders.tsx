"use client";
import { useQuery } from "@tanstack/react-query";
import { OrdersInterface } from "../interfaces/order.interface";
import GetUserOrders from "./GetUserOrders";
import Loading from "../loading/Loading";
import { useSession } from "next-auth/react";
import { UserOrders } from "../apis/orders/UserOrder";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export default function GetAllOrders() {


  const { data: session, status } = useSession();

  const token = session?.token;

  let userId: string | undefined;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      userId = decoded.id;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const {
    data: userOrders,
    isLoading,
    error,
  } = useQuery<OrdersInterface[]>({
    queryKey: ["userOrders", userId],
    queryFn: () => UserOrders({ userId : userId as string, token: token! }),
    enabled: !!userId && !!token,
  });

  if (!token || !userId) {
    return (
      <p className="text-center mt-10">Please login to see your orders 🔐</p>
    );
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading orders ❌</p>;
  }
  return (
    <>
      <GetUserOrders userOrders={userOrders!}></GetUserOrders>
    </>
  );
}
