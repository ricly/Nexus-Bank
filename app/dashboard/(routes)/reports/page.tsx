"use client";

import LoadingComponent from "@/components/loading-component";
import useActiveUser from "@/hooks/auth/use-active-user";
import BalanceCard from "../../_components/balance-card";

import VerifyAccountOverlay from "@/components/verify-account-overlay";
import { useRouter } from "next/navigation";
import Transactions from "../../_components/transactions";

const ReportsPage = () => {
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
          <BalanceCard />
          <Transactions userId={activeUser._id} />
        </>
      )}
    </div>
  );
};

export default ReportsPage;
