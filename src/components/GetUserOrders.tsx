import { OrdersInterface } from "../interfaces/order.interface";
import Image from "next/image";
import emptyOrder from "@/public/empty order.jpg";

interface UserOrdersProps {
  userOrders: OrdersInterface[];
}
export default function GetUserOrders({ userOrders }: UserOrdersProps) {
  if (!userOrders || userOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-center text-gray-500 mb-4">
          No orders found for this user 🛒
        </p>
        <Image width={500} height={500} src={emptyOrder} alt="empty orders" />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 p-4 sm:p-6">
      {userOrders?.map((order) =>
        order.cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-neutral-primary-soft p-4 sm:p-6 border border-default rounded-2xl shadow-xs hover:shadow-md transition-shadow w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
          >
            <Image
              width={200}
              height={200}
              className="rounded-2xl w-full h-auto object-cover"
              src={item.product.imageCover}
              alt="image cover for the product"
            />
            <h5 className="mt-4 sm:mt-6 mb-2 text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-heading line-clamp-2">
              {item.product.title}
            </h5>
            <p className="mb-2 text-base sm:text-lg text-body font-bold">
              {item.price} EGP
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Quantity: {item.count}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Payment: {order.paymentMethodType}
            </p>
            <p className="text-xs text-gray-400 mt-2">Order #{order.id}</p>
          </div>
        ))
      )}
    </div>
  );
}
