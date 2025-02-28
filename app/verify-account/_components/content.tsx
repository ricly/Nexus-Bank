"use client";

import { Suspense } from "react";
// import "intasend-inlinejs-sdk"
import Loading from "@/app/verify-account/loading";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import useActiveUser from "@/hooks/auth/use-active-user";
import { REGISTRATION_AMOUNT } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { ArrowLeft, Loader, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const documentTypes = [
  { value: "utility", label: "Utility Bill" },
  { value: "bank", label: "Bank Statement" },
  { value: "tax", label: "Tax Document" },
  { value: "passport", label: "Passport" },
  { value: "nationalId", label: "National ID" },
  { value: "driversLicense", label: "Driver's License" },
];

const totalSteps = 2;

const formSchema = z.object({
  streetAddress: z.string().min(1, { message: "Street address is required" }),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  documentType: z.string().min(1, "Document type is required"),
});

const VerifyAccountSteps = () => {
  const searchParams = useSearchParams();
  const checkout_id = searchParams.get("checkout_id");
  const [step, setStep] = useState(checkout_id ? 3 : 1);
  const [isPaying, setIsPaying] = useState(false);

  const updateUser = useMutation(api.users.updateUser);
  const createTransaction = useMutation(api.transactions.createTransaction);
  const { activeUser } = useActiveUser();
  const [submitting, setSubmitting] = useState(false);

  const [activeDocumentType, setActiveDocumentType] = useState("");
  const [document, setDocument] = useState<File>();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetAddress: "",
      country: "",
      city: "",
      postalCode: "",
      documentType: "",
    },
  });

  const w = form.watch("documentType");

  useEffect(() => {
    const documentType = documentTypes.find(
      (doc) => doc.value === form.getValues("documentType")
    )?.label;

    if (!documentType) return;

    setActiveDocumentType(documentType);
  }, [w, form]);

  const onSubmit = async () => {
    if (!activeUser) return;

    try {
      setSubmitting(true);
      await createTransaction({
        user: activeUser._id,
        type: "deposit",
        amount: REGISTRATION_AMOUNT,
        currency: "usd",
        description: "",
        status: "pending",
      });

      await updateUser({
        id: activeUser._id,
        balance: activeUser.balance + REGISTRATION_AMOUNT,
        isVerified: true,
      });

      location.replace("/dashboard");
    } catch (error) {
      console.log("ERROR ===>", error);
    } finally {
      setSubmitting(false);
    }
  };

  const onPay = async () => {
    if (!activeUser) return;

    try {
      setIsPaying(true);
      await createTransaction({
        user: activeUser._id,
        type: "deposit",
        amount: REGISTRATION_AMOUNT,
        currency: "usd",
        description: "Reg",
        status: "pending",
      });

      await updateUser({
        id: activeUser._id,
        isVerificationPending: true,
      });

      const url = process.env.NEXT_PUBLIC_INTASEND_PAYMENT_LINK;
      const paymentWindow = window.open(url, "_blank");

      // Only redirect to dashboard after payment window is closed
      if (paymentWindow) {
        const checkWindow = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(checkWindow);
            window.location.href = "/dashboard";
          }
        }, 500);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsPaying(false);
    }
  };

  const renderButton = () => {
    switch (step) {
      case 1:
        return (
          <Button
            size="lg"
            type="button"
            className="w-full"
            disabled={
              !form.getFieldState("streetAddress").isDirty ||
              !form.getFieldState("city").isDirty ||
              !form.getFieldState("postalCode").isDirty ||
              !form.getFieldState("country").isDirty ||
              !form.getFieldState("documentType").isDirty ||
              !document ||
              !!form.getFieldState("streetAddress").error ||
              !!form.getFieldState("city").error ||
              !!form.getFieldState("postalCode").error ||
              !!form.getFieldState("country").error ||
              !!form.getFieldState("documentType").error ||
              form.formState.isSubmitting
            }
            onClick={() => {
              setStep((prev) => prev + 1);
            }}
          >
            Continue →
          </Button>
        );
      case 2:
        return (
          <Button
            size="lg"
            type="button"
            className="w-full"
            disabled={isPaying}
            onClick={onPay}
          >
            {isPaying && <Loader2 className="size-4 mr-2 animate-spin" />}
            Pay ${REGISTRATION_AMOUNT} Now
          </Button>
        );
      case 3:
        return (
          <Button
            disabled={!activeUser?._id || submitting}
            type="button"
            className="w-full"
            size="lg"
            onClick={onSubmit}
          >
            {submitting && <Loader className="size-4 mr-2 animate-spin" />}
            Continue to Dashboard →
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-1.5 w-full bg-gray-200">
        <div
          style={{
            width: (step / totalSteps) * 100 + "%",
          }}
          className="bg-primary h-full rounded-r-xl transition-all duration-700"
        />
      </div>
      <div className="py-5 flex items-center">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {step > 1 && (
              <Button
                variant={"ghost"}
                onClick={() => {
                  setStep((prev) => (prev < 2 ? prev : prev - 1));
                }}
              >
                <ArrowLeft />
              </Button>
            )}
            <Logo />
          </div>

          <div className="flex flex-col items-end text-sm">
            <p className="text-muted-foreground">
              STEP {step} / {totalSteps}
            </p>
            <p className="font-semibold">
              {step === 1
                ? "Verify your identity"
                : step === 2
                  ? "Deposit verification"
                  : "Verification done!"}
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 h-screen overflow-y-auto">
        <div className="container mx-auto flex flex-col items-center">
          <Card className="w-full md:w-[500px]">
            <CardHeader>
              <h2 className="text-xl font-semibold">
                {step === 1
                  ? "Personal Information"
                  : step === 2
                    ? "Verification Deposit"
                    : "Verification Done!"}
              </h2>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {step === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your street address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal code</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter postal code"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>

                            <FormControl>
                              <Input placeholder="Enter country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Proof of address type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select document type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {documentTypes.map((t) => (
                                  <SelectItem key={t.value} value={t.value}>
                                    {t.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {activeDocumentType && (
                        <div className="flex flex-col space-y-4">
                          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Upload {activeDocumentType}
                          </div>
                          <Label
                            htmlFor="file"
                            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                          >
                            <input
                              id="file"
                              type="file"
                              onChange={(e) => setDocument(e.target.files?.[0])}
                              accept=".pdf, jpg, jpeg, .png"
                              className="hidden"
                            />

                            <p className="text-muted-foreground">
                              {document?.name ?? `Upload ${activeDocumentType}`}
                            </p>

                            <div className="ml-auto text cursor-pointer">
                              Upload
                            </div>
                          </Label>
                        </div>
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <p className="text-sm text-gray-600">
                        To complete your verification, please deposit $
                        {REGISTRATION_AMOUNT}. This amount will reflect in your
                        account and is necessary for identity verification
                        purposes.
                      </p>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <p className="text-sm text-gray-600">
                        Your ${REGISTRATION_AMOUNT} verification deposit has
                        been successfully processed, and your account is now
                        verified. You can now access all the features of your
                        banking account.
                      </p>
                    </>
                  )}

                  {renderButton()}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default function VerifyAccountContent() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyAccountSteps />
    </Suspense>
  );
}
