"use client";

import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Loader2, LockIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import OTPInput from "@/components/otp-input";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/lib/schemas/auth.schema";

const ResetPasswordCard = () => {
  const [step, setStep] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const { isLoaded, setActive, signIn } = useSignIn();
  const form = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSendResetPasswordCode = async (
    email: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;
    const toastId = toast.loading(`Sending Password Reset Code`, {
      id: "passwordResendCode",
      style: {
        color: "black",
      },
    });

    try {
      setErrors(undefined);
      setSendingCode(true);

      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      toast.success(`Code has been sent to ${email}`, {
        id: toastId,
        style: {
          color: "black",
        },
      });

      onNext((prev) => prev + 1);
    } catch (error: any) {
      console.log("PASSWORD RESET CODE ERROR ====>", error);
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
        console.log(JSON.parse(JSON.stringify(error, null, 2)));
      }

      toast.error("Something went wrong", {
        id: toastId,
        style: {
          color: "red",
        },
      });
    } finally {
      setSendingCode(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    if (!isLoaded) return console.log("NOT LOADED");

    const toastId = toast.loading("Reseting password", {
      id: "resetpassword",
      style: {
        color: "black",
      },
    });

    try {
      setErrors(undefined);
      const { code, password } = values;
      const passwordResetAttempt = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (passwordResetAttempt.status === "complete") {
        await setActive({ session: passwordResetAttempt.createdSessionId });
        toast.success("Logged in", { id: toastId });
        location.replace(`/dashboard`);
      }
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
        console.log(JSON.parse(JSON.stringify(error, null, 2)));
      }
    } finally {
      toast.dismiss(toastId);
    }
  };

  const {
    getFieldState,
    getValues,
    formState: { isSubmitting },
  } = form;

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center text-center p-7">
        <CardTitle className="flex-1 text-left text-2xl">
          Reset Password
        </CardTitle>
      </CardHeader>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 0 && (
              <>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter Email Address"
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 1 && (
              <>
                <p className="max-w-lg mx-auto text-sm text-center">
                  Enter the password reset code that was sent to your email
                </p>
                <FormField
                  name="code"
                  render={({ field }) => (
                    <FormItem className="mx-auto w-fit">
                      <FormControl>
                        <OTPInput field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <p className="max-w-lg mx-auto text-sm text-center">
                  Enter your new password
                </p>

                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          field={field}
                          min={8}
                          max={256}
                          placeholder="Enter new password"
                          name="password"
                          label="Enter Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          field={field}
                          min={8}
                          max={256}
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          label="Confirm Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Buttons */}

            {step === 0 && (
              <Button
                role="button"
                color="primary"
                disabled={sendingCode || !getFieldState("email").isDirty}
                size={"lg"}
                className="w-full capitalize"
                onClick={() => {
                  const { isDirty: isEmail } = getFieldState("email");

                  if (isEmail) {
                    handleSendResetPasswordCode(getValues("email"), setStep);
                  }
                }}
              >
                {sendingCode ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <LockIcon className="mr-2 size-4" />
                )}
                Send password reset code
              </Button>
            )}

            {step === 1 && (
              <Button
                role="button"
                color="primary"
                disabled={!getFieldState("code").isDirty}
                size={"lg"}
                className="w-full capitalize"
                onClick={() => {
                  const { isDirty: isCode } = getFieldState("code");

                  if (isCode) {
                    setStep(2);
                  }
                }}
              >
                Continue
                <ChevronRight className="mr-2 size-4" />
              </Button>
            )}

            {step === 2 && (
              <Button
                type="submit"
                size={"lg"}
                color="primary"
                className="w-full"
                disabled={
                  isSubmitting ||
                  !getFieldState("code").isDirty ||
                  !!getFieldState("password").error
                }
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <LockIcon className="mr-2 size-4" />
                )}
                Reset Password
              </Button>
            )}

            {errors && (
              <ul>
                {errors.map((el, index) => (
                  <li key={index} className="text-red-500 text-sm text-center">
                    {el.longMessage}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordCard;
