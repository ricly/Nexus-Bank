"use client";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { toast } from "sonner";

interface VerificationBannerProps {
  activeUser: Doc<"users">;
}

const VerificationBanner = ({ activeUser }: VerificationBannerProps) => {
  return (
    <div className="rounded-lg bg-[#1c1c2e] text-white p-5 md:p-8 relative overflow-hidden">
      <div className="relative z-10">
        {activeUser.isVerificationPending ? (
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Your verification is being processed...
          </h2>
        ) : (
          <>
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Verify your account to finish setting up
            </h2>
            <p className="text-gray-300 mb-4">
              Verify your identity to start enjoying services
            </p>
          </>
        )}

        <Button
          asChild
          variant="secondary"
          onClick={() => {
            if (activeUser.isVerificationPending) {
              toast.info(
                "Your verification is pending. Please check back later."
              );
            }
          }}
        >
          <Link
            href={activeUser.isVerificationPending ? "#" : "/verify-account"}
          >
            {activeUser.isVerificationPending
              ? "Verification Pending"
              : "Start verification"}
          </Link>
        </Button>
      </div>

      <div className="absolute right-0 top-0 h-full w-1/3">
        <div className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-50 blur-3xl" />
      </div>
    </div>
  );
};

export default VerificationBanner;
