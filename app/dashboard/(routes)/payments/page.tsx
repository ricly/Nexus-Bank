"use client";

import LoadingComponent from "@/components/loading-component";
import VerifyAccountOverlay from "@/components/verify-account-overlay";
import useActiveUser from "@/hooks/auth/use-active-user";
import { useRouter } from "next/navigation";
import QuickActions from "../../_components/quick-actions";

const PaymentsPage = () => {
  const { activeUser } = useActiveUser();
  const router = useRouter();

  if (activeUser === undefined) return <LoadingComponent />;

  if (!activeUser) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="container md:max-w-screen-2xl mx-auto space-y-6 md:px-0 relative">
      {!activeUser?.isVerified && (
        <VerifyAccountOverlay activeUser={activeUser} />
      )}

      {activeUser?.isVerified && (
        <>
          <QuickActions />
        </>
      )}
    </div>
  );
};

export default PaymentsPage;
