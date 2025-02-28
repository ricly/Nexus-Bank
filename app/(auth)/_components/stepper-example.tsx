"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

const totalSteps = 4;

const StepperExample = () => {
  const [country, setCountry] = useState("");
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return <Step1 setCountry={setCountry} />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
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

  return (
    <div className="w-[90vw] md:w-[500px] max-w-lg">
      {/* Step indicator */}
      {renderStepIndicator()}

      <div className="w-full p-6 bg-white rounded-lg shadow-xl border border-gray-100">
        {renderComponent()}

        {/* Continue button */}
        <Button
          onClick={handleContinue}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-all ${
            country
              ? "bg-primary hover:bg-primary/75"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={step === 1 && !country}
        >
          Continue →
        </Button>

        {/* Sign-in link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepperExample;

const Step1 = ({
  setCountry,
}: {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="mb-4 space-y-4">
      <label
        htmlFor="country"
        className="block text-gray-900 font-semibold text-xl"
      >
        What country do you live in?
      </label>
      <Select onValueChange={(value) => setCountry(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            <SelectItem value="west">
              Western European Summer Time (WEST)
            </SelectItem>
            <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
            <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
            <SelectItem value="ist_indonesia">
              Indonesia Central Standard Time (WITA)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Australia & Pacific</SelectLabel>
            <SelectItem value="awst">
              Australian Western Standard Time (AWST)
            </SelectItem>
            <SelectItem value="acst">
              Australian Central Standard Time (ACST)
            </SelectItem>
            <SelectItem value="aest">
              Australian Eastern Standard Time (AEST)
            </SelectItem>
            <SelectItem value="nzst">
              New Zealand Standard Time (NZST)
            </SelectItem>
            <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>South America</SelectLabel>
            <SelectItem value="art">Argentina Time (ART)</SelectItem>
            <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const Step2 = () => {
  const [gender, setGender] = useState("");

  return (
    <div className="w-full pb-5">
      <h2 className=" text-gray-900 font-semibold text-xl mb-8">
        Account Information
      </h2>

      <div className="space-y-6">
        {/* First Name */}
        <div>
          <Label htmlFor="first-name">First name (as it is on your ID)</Label>
          <Input id="first-name" placeholder="Enter your legal first name" />
        </div>

        {/* Middle Name */}
        <div>
          <Label htmlFor="middle-name">
            Middle name{" "}
            <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input id="middle-name" placeholder="Enter your legal middle name" />
        </div>

        {/* Surname */}
        <div>
          <Label htmlFor="surname">Surname (as it is on your ID)</Label>
          <Input id="surname" placeholder="Enter your legal surname" />
        </div>

        {/* Gender */}
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select onValueChange={(value) => setGender(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phone-number">Phone number</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-muted-foreground text-muted text-sm border rounded-l-md">
              +254
            </span>
            <Input
              id="phone-number"
              type="tel"
              placeholder="Enter phone number"
              className="rounded-l-none"
            />
          </div>
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

const Step3 = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  return (
    <div className="max-w-lg mx-auto md:px-4 py-8">
      <h2 className=" text-gray-900 font-semibold text-xl mb-8">
        Create password
      </h2>

      <div className="space-y-6">
        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="Enter password (min. of 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirm-password">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type="password"
              placeholder="Enter password (min. of 8 characters)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Email Updates Checkbox */}
        <div className="flex items-start space-x-2">
          <Checkbox id="email-updates" />
          <Label htmlFor="email-updates" className="text-sm">
            I agree to receive product updates, announcements, and exclusive
            offers via email.
          </Label>
        </div>

        {/* Terms and Privacy Checkbox */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={isTermsAccepted}
            onCheckedChange={(checked) => setIsTermsAccepted(!!checked)}
          />
          <Label htmlFor="terms" className="text-sm">
            I accept the{" "}
            <a href="/terms" className="underline text-primary">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="underline text-primary">
              Privacy Policy
            </a>
            .
          </Label>
        </div>
      </div>
    </div>
  );
};

const Step4 = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-lg md:text-xl text-gray-900 font-semibold mb-4 md:mb-8">
        Verify your email address
      </h2>

      <div>
        <Label htmlFor="verify" className="text-muted-foreground">
          Please enter the OTP sent to the email address you provide to verify
          your email address
        </Label>

        <div className="relative mt-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(otpValue) => setOtp(otpValue)}
          >
            <div className="flex items-center gap-1 md:gap-3">
              <div>
                <InputOTPSlot index={0} />
              </div>
              <div>
                <InputOTPSlot index={1} />
              </div>
              <div>
                <InputOTPSlot index={2} />
              </div>

              <InputOTPSeparator className="hidden md:flex" />

              <div>
                <InputOTPSlot index={3} />
              </div>
              <div>
                <InputOTPSlot index={4} />
              </div>
              <div>
                <InputOTPSlot index={5} />
              </div>
            </div>
          </InputOTP>
        </div>
      </div>
    </div>
  );
};
