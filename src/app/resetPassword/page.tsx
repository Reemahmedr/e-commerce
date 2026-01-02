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
import { ResetPasswordToNew } from "@/src/apis/forgetPassword/ResetPassword.api";
import ResetPassword from "@/src/scheme/ResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export default function page() {
  type ResetPassword = z.infer<typeof ResetPassword>;
  const form = useForm<ResetPassword>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ResetPassword) {
    setLoading(true);
    const payload = await ResetPasswordToNew(data);
    toast.success("Password reset successfully!");
    setLoading(false);
    window.location.href = "/login";
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
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <>
                    <Input type="password" className="mb-5" {...field} />
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
