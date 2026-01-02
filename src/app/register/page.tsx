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
import { Register } from "@/src/apis/register/Register.api";
import registerSchema from "@/src/scheme/register.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function page() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setLoading(true);
    const payload = await Register(data);
    if (payload.message === "success") {
      setLoading(false);
      toast.success("successfully registered");
      window.location.href = "/login";
    } else {
      toast.error("failed to register");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="py-0.5">Name</FormLabel>
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
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <>
                    <Input className="mb-5" {...field} />
                  </>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-1/4 cursor-pointer bg-[#AFD543] hover:bg-[#AFD543] block mx-auto">
            {loading ? "Registering..." : "Register Now"}
          </Button>
        </form>
      </Form>
    </>
  );
}
