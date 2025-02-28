"use client";

import OTPInput from "@/components/otp-input";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { BACKACCOUNTLENGTH, BANKCODE, BRANCHCODE } from "@/lib/constants";
import { countries } from "@/lib/data";
import {
  Gender,
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/lib/schemas/auth.schema";
import { cn, generateAccountNumber } from "@/lib/utils";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

const totalSteps = 4;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [generatingOtp, setGeneratingOtp] = useState(false);
  const { isLoaded, setActive, signUp } = useSignUp();
  const createUser = useMutation(api.users.createUser);

  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();

  const form = useForm<UserRegistrationProps>({
    mode: "onChange",
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      country: "",
      firstName: "",
      middleName: "",
      surname: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;
    const toastId = toast.loading(`Generating OTP`, {
      id: "generateOTP",
      style: {
        color: "black",
      },
    });

    try {
      setGeneratingOtp(true);

      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      toast.success(`OTP has been sent to ${email}`, {
        id: toastId,
        style: {
          color: "black",
        },
      });

      onNext((prev) => prev + 1);
    } catch (error: any) {
      console.log("GENERATE OTP ERROR ====>", error);
      toast.error("Something went wrong", {
        id: toastId,
        style: {
          color: "red",
        },
      });
    } finally {
      setGeneratingOtp(false);
    }
  };

  const onSubmit = async (values: UserRegistrationProps) => {
    if (!isLoaded) return console.log("NOT LOADED");

    const toastId = toast.loading("Verifying OTP", {
      id: "verifyOTP",
      style: {
        color: "black",
      },
    });

    const {
      country,
      email,
      firstName,
      gender,
      middleName,
      otp,
      phone,
      surname,
    } = values;

    try {
      const verificationAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (verificationAttempt.status !== "complete")
        return { message: "Something went wrong" };

      if (verificationAttempt.status === "complete") {
        if (!signUp.createdUserId) return;

        // add user to db
        const userId = await createUser({
          uid: signUp.createdUserId,
          firstName,
          middleName,
          surname,
          gender: gender as Gender,
          email,
          phone,
          avatarUrl: "",
          country,
          isVerified: false,
          balance: 0,
          accountNumber: generateAccountNumber(
            BANKCODE,
            BRANCHCODE,
            BACKACCOUNTLENGTH
          ),
        });

        if (userId) {
          await setActive({
            session: verificationAttempt.createdSessionId,
          });

          toast.success("Account created successfully", {
            id: toastId,
            style: {
              color: "black",
            },
          });

          setIsRedirecting(true);

          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      console.log("SIGN UP ERROR ====>", error);
      toast.error("Something went wrong", {
        id: toastId,
        style: {
          color: "red",
        },
      });
    } finally {
      // toast.dismiss(toastId);
    }
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return <Step1 form={form} />;
      case 2:
        return <Step2 form={form} />;
      case 3:
        return <Step3 form={form} />;
      case 4:
        return <Step4 form={form} />;
      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    const title =
      step === 1
        ? "Country of residence"
        : step === 2
          ? "Basic account information"
          : step === 3
            ? "Create password"
            : "Verify email";

    return (
      <div className="mb-6 p-6 rounded-lg bg-white shadow-md border border-gray-100 flex items-center">
        {step > 1 && (
          <Button
            role="button"
            size={"sm"}
            onClick={() => {
              setStep((prev) => (prev < 2 ? prev : prev - 1));
            }}
            className="inline mr-2"
          >
            <ArrowLeft />
          </Button>
        )}

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">
            STEP {step}/{totalSteps}
          </p>
          <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center mt-2">
            <div
              style={{
                width: (step / totalSteps) * 100 + "%",
              }}
              className="h-2 bg-primary rounded-full"
            ></div>
            <div
              style={{
                width: (1 - step / totalSteps) * 100 + "%",
              }}
              className="h-2 bg-gray-300 rounded-full w-full ml-2"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderButton = () => {
    const buttonStyles = `w-full py-2 px-4 text-white font-semibold rounded-md transition-all disabled:bg-gray-300 disabled:cursor-not-allowed`;

    switch (step) {
      case 1:
        return (
          <Button
            className={cn(buttonStyles)}
            disabled={
              !form.getFieldState("country").isDirty ||
              form.formState.isSubmitting
            }
            onClick={() => {
              form.trigger("country");
              if (form.getFieldState("country").error) return;

              if (form.getValues("country")) {
                setStep(2);
              }
            }}
          >
            Continue →
          </Button>
        );
      case 2:
        return (
          <Button
            className={cn(buttonStyles)}
            disabled={
              !form.getFieldState("firstName").isDirty ||
              !form.getFieldState("surname").isDirty ||
              !form.getFieldState("gender").isDirty ||
              !form.getFieldState("email").isDirty ||
              !form.getFieldState("phone").isDirty ||
              !!form.getFieldState("firstName").error ||
              !!form.getFieldState("surname").error ||
              !!form.getFieldState("gender").error ||
              !!form.getFieldState("email").error ||
              !!form.getFieldState("phone").error ||
              form.formState.isSubmitting
            }
            onClick={() => {
              form.trigger("firstName");
              form.trigger("middleName");
              form.trigger("surname");
              form.trigger("gender");
              form.trigger("email");
              form.trigger("phone");
              if (
                form.getFieldState("firstName").error ||
                form.getFieldState("middleName").error ||
                form.getFieldState("surname").error ||
                form.getFieldState("gender").error ||
                form.getFieldState("email").error ||
                form.getFieldState("phone").error
              )
                return;

              setStep(3);
            }}
          >
            Continue →
          </Button>
        );
      case 3:
        return (
          <Button
            className={cn(buttonStyles)}
            disabled={
              !form.getFieldState("firstName").isDirty ||
              !form.getFieldState("surname").isDirty ||
              !form.getFieldState("gender").isDirty ||
              !form.getFieldState("email").isDirty ||
              !form.getFieldState("phone").isDirty ||
              !form.getFieldState("password").isDirty ||
              !form.getFieldState("confirmPassword").isDirty ||
              !!form.getFieldState("password").error ||
              !!form.getFieldState("confirmPassword").error ||
              form.formState.isSubmitting ||
              generatingOtp
            }
            onClick={() => {
              form.trigger("password");
              form.trigger("confirmPassword");

              const password = form.getValues("password");
              const email = form.getValues("email");

              if (!password || !email) return;

              onGenerateOTP(email, password, setStep);
            }}
          >
            {generatingOtp && <Loader2 className="size-4 mr-2 animate-spin" />}
            Continue →
          </Button>
        );
      case 4:
        return (
          <Button
            type="submit"
            className={cn(buttonStyles)}
            disabled={
              !form.getFieldState("firstName").isDirty ||
              !form.getFieldState("surname").isDirty ||
              !form.getFieldState("gender").isDirty ||
              !form.getFieldState("email").isDirty ||
              !form.getFieldState("phone").isDirty ||
              !form.getFieldState("password").isDirty ||
              !form.getFieldState("confirmPassword").isDirty ||
              !form.getFieldState("otp").isDirty ||
              !!form.getFieldState("otp").error ||
              form.formState.isSubmitting
            }
          >
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 mr-2 animate-spin" />
            )}
            Verify your account
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[90vw] md:w-[500px] max-w-lg">
      {/* Step indicator */}
      {renderStepIndicator()}

      <div className="w-full p-6 bg-white rounded-lg shadow-xl border border-gray-100 relative">
        {isRedirecting && (
          <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-white/75 z-10 grid place-items-center">
            <Loader2 className="size-10 text-primary animate-spin" />
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {renderComponent()}

            {renderButton()}
          </form>
        </Form>

        {/* Sign-in link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Got an account?{" "}
            <a href="/sign-in" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

interface IProps {
  form: UseFormReturn<UserRegistrationProps, any, undefined>;
}

const Step1 = ({ form }: IProps) => {
  return (
    <div className="mb-4 ">
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="block text-gray-900 font-semibold text-xl">
              What country do you live in?
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {countries.map((item, index) => (
                  <SelectItem key={index} value={item.code}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const Step2 = ({ form }: IProps) => {
  return (
    <div className="w-full pb-5">
      <h2 className=" text-gray-900 font-semibold text-xl mb-8">
        Account Information
      </h2>

      <div className="space-y-6">
        {/* First Name */}
        <div>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <Label>First name (as it is on your ID)</Label>
                <FormControl>
                  <Input placeholder="Enter your legal first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Middle Name */}
        <div>
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Middle name{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <FormControl>
                  <Input
                    placeholder="Enter your legal middle name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Surname */}
        <div>
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <Label>Surname (as it is on your ID)</Label>
                <FormControl>
                  <Input placeholder="Enter your legal surname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Gender */}
        <div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email Address */}
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email address</Label>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone Number */}
        <div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label>Phone number</Label>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Referral Code */}
        <div>
          <Label htmlFor="referral-code">
            Referral code{" "}
            <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="referral-code"
            placeholder="Referral code of user that referred you"
          />
        </div>
      </div>
    </div>
  );
};

const Step3 = ({ form }: IProps) => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  return (
    <div className="max-w-lg mx-auto md:px-4 py-8">
      <h2 className=" text-gray-900 font-semibold text-xl mb-8">
        Create password
      </h2>

      <div className="space-y-6">
        {/* Password */}
        <div>
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
                    placeholder="Enter password (min. of 8 characters)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <Label>Confirm password</Label>
                <FormControl>
                  <PasswordInput
                    field={field}
                    name="confirmPassword"
                    max={256}
                    min={8}
                    placeholder="Enter password (min. of 8 characters)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Terms and Privacy Checkbox */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={isTermsAccepted}
            onCheckedChange={(checked) => setIsTermsAccepted(!!checked)}
          />
          <Label htmlFor="terms" className="text-sm">
            I accept the Terms of Use and Privacy Policy.
          </Label>
        </div>
      </div>
    </div>
  );
};

const Step4 = ({ form }: IProps) => {
  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-lg md:text-xl text-gray-900 font-semibold mb-4 md:mb-8">
        Verify your email address
      </h2>

      <div className="mt-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <Label className="text-muted-foreground">
                Please enter the OTP sent to the email address you provide to
                verify your email address
              </Label>

              <FormControl>
                <OTPInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
