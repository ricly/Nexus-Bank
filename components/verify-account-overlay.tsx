"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

interface VerifyAccountOverlayProps {
  className?: string;
  activeUser: Doc<"users">;
}

const VerifyAccountOverlay = ({
  className,
  activeUser,
}: VerifyAccountOverlayProps) => {
  return (
    <div
      className={cn(
        "absolute top-10 left-0 w-full h-[50vh] blur-0 flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="p-8 text-center max-w-screen-sm mx-auto">
        <h2 className="text-2xl font-bold text-primary">
          {activeUser.isVerificationPending
            ? "Your verification is being processed..."
            : "Activate Your Account"}
        </h2>
        <p className="mt-4 text-gray-700 max-w-md text-center">
          Your account is not activated. Please verify your account and start
          enjoying our services.
        </p>
        {!activeUser.isVerificationPending && (
          <Button asChild className="mt-8">
            <Link href={"/verify-account"}>Verify Account</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerifyAccountOverlay;
