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
import { ResetCode } from "@/src/apis/forgetPassword/VerifyResetCode.api";
import resetCode from "@/src/scheme/ResetCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export default function page() {
  type ResetCode = z.infer<typeof resetCode>;
  const form = useForm<ResetCode>({
    resolver: zodResolver(resetCode),
    defaultValues: {
      resetCode: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ResetCode) {
    setLoading(true);
    const payload = await ResetCode(data);

    if (payload.status === "Success") {
      toast.success("your Code successfully verfied");
      setLoading(false);
      window.location.href = "/resetPassword";
    } else {
      toast.error("Failed to verfiy your code");
    }
    console.log(payload);
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
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter the code (Reseved to your email)</FormLabel>
                <FormControl>
                  <>
                    <Input className="mb-5" {...field} />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-1/4 cursor-pointer bg-[#AFD543] hover:bg-[#AFD543] block mx-auto"
          >
            {loading ? "Verfiying..." : "Verfiy Code"}
          </Button>
        </form>
      </Form>
    </>
  );
}
