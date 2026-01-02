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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import loginSchema from "./../../scheme/Login.schema";
import Link from "next/link";

type LoginForm = z.infer<typeof loginSchema>;

export default function page() {
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginForm) {
    setLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
      redirect: false,
    });

    if (response?.ok) {
      window.location.href = response.url || "/";
      setLoading(false);
      toast.success("Login successful");
    } else {
      toast.error(response?.error || "Login failed");
      setLoading(false);
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="password"
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
          <Link className=" hover:underline" href={"/forgetPassword"}>
            Forget Password ?
          </Link>
          <Button
            type="submit"
            className="w-1/4 cursor-pointer bg-[#AFD543] hover:bg-[#AFD543] block mx-auto"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
}
