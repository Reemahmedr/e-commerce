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
import { ForgetPassword } from "@/src/apis/forgetPassword/ForgetPassword.api";
import forgetPassword from "@/src/scheme/ForgetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export default function page() {
  type ResetPassword = z.infer<typeof forgetPassword>;
  const form = useForm<ResetPassword>({
    resolver: zodResolver(forgetPassword),
    defaultValues: {
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ResetPassword) {
    setLoading(true);
    const payload = await ForgetPassword(data);
    if (payload.statusMsg === "success") {
      toast.success("Your email successfully found");
      setLoading(false);
      window.location.href = "/resetCode";
    } else {
      toast.error("Failed to find your email");
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
            {loading ? "Loading..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
}
