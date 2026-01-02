"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OnlinePayment } from "../apis/payment/onlinePayment";
import { CashPayment } from "../apis/payment/cashPayment";

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<"online" | "cash" | null>(
    null
  );
  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function onSubmit(data: {
    city: string;
    details: string;
    phone: string;
  }) {
    setLoading(true);
    setPaymentType("online");
    const payload = await OnlinePayment(cartId, data);
    console.log(payload);
    if (payload.status === "success") {
      setLoading(false);
      window.location.href = payload.session.url;
    }
  }

  async function handleCashOrder(data: {
    city: string;
    details: string;
    phone: string;
  }) {
    setLoading(true);
    setPaymentType("cash");
    const res = await CashPayment(cartId, data);
    if (res.status === "success") {
      setLoading(false);
      window.location.href = "/allorders";
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2xl mx-auto my-12 space-y-3"
        >
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <>
                    <Input className="mb-5" {...field} />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="text"
                      className="mb-5"
                      autoComplete="off"
                      {...field}
                    />
                  </>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="phone"
                      className="mb-5"
                      autoComplete="off"
                      {...field}
                    />
                  </>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button type="submit" className="w-1/4 cursor-pointer block mx-auto">
            {loading ? "Processing..." : "Checkout"}
          </Button> */}
          <div>
            <Button
              type="button"
              onClick={form.handleSubmit(handleCashOrder)}
              disabled={loading}
              className="flex-1"
              variant="outline"
            >
              {loading && paymentType === "cash" ? (
                "Processing..."
              ) : (
                <>💵 Cash on Delivery</>
              )}
            </Button>

            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={loading}
              className="flex-1 mx-3"
            >
              {loading && paymentType === "online" ? (
                "Processing..."
              ) : (
                <>💳 Pay Online</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
