"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserLoginProps, UserLoginSchema } from "@/lib/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const params = useSearchParams();
  const redirect_url = params.get("redirect_url");

  const { isLoaded, setActive, signIn } = useSignIn();

  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<UserLoginProps>({
    mode: "onChange",
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: UserLoginProps) => {
    if (!isLoaded) return console.log("NOT LOADED");

    const toastId = toast.loading("Logging in", {
      id: "loingin",
      style: {
        color: "black",
      },
    });

    try {
      setErrors(undefined);
      const { email, password } = values;
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setIsRedirecting(true);
        toast.success("Logged in", { id: toastId });
        location.replace(
          redirect_url || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
        );
      }
    } catch (error: any) {
      console.log("ERROR HERE", error);

      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
        console.log(JSON.parse(JSON.stringify(error, null, 2)));
        toast.error(error.errors[0].longMessage, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[500px] max-w-lg">
      <div className="w-full p-6 bg-white rounded-lg shadow-xl border border-gray-100 relative">
        {(isRedirecting || !isLoaded) && (
          <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-white/75 z-10 grid place-items-center">
            <Loader2 className="size-10 text-primary animate-spin" />
          </div>
        )}

        <h2 className=" text-gray-900 font-semibold text-xl mb-8">
          Welcome back
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col"
          >
            <div className="space-y-4">
              {/* Email Address */}
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Email address</Label>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Password</Label>
                      <FormControl>
                        <PasswordInput
                          field={field}
                          name="password"
                          max={256}
                          min={8}
                          placeholder="Enter password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href={"/forgot-password"}
                  className="block text-blue-600 text-sm"
                >
                  &nbsp;Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-all disabled:bg-gray-300 disabled:cursor-not-allowed mt-8`}
              disabled={
                !form.getFieldState("email").isDirty ||
                !form.getFieldState("password").isDirty ||
                !!form.getFieldState("email").error ||
                !!form.getFieldState("password").error ||
                form.formState.isSubmitting
              }
            >
              {form.formState.isSubmitting && (
                <Loader2 className="size-4 mr-2 animate-spin" />
              )}
              Login to your account
            </Button>

            {errors && (
              <ul className="mt-4">
                {errors.map((el, index) => (
                  <li key={index} className="text-red-500 text-sm">
                    {el.longMessage?.includes("Password is incorrect")
                      ? "Password is incorrect"
                      : el.longMessage}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </Form>

        {/* Sign-in link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
