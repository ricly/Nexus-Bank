"use client";

import LoadingComponent from "@/components/loading-component";
import useActiveUser from "@/hooks/auth/use-active-user";
import { useRouter } from "next/navigation";
import BalanceCard from "./_components/balance-card";
import QuickActions from "./_components/quick-actions";
import Transactions from "./_components/transactions";
import VerificationBanner from "./_components/verification-banner";

const DashboardPage = () => {
  const { activeUser, isLoaded } = useActiveUser();
  const router = useRouter();

  if (activeUser === undefined || !isLoaded) return <LoadingComponent />;

  if (!activeUser) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="container md:max-w-screen-2xl mx-auto space-y-6 md:px-0 relative">
      {!activeUser?.isVerified && (
        <VerificationBanner activeUser={activeUser} />
      )}

      <QuickActions />
      <BalanceCard />
      <Transactions userId={activeUser._id} />
    </div>
  );
};

export default DashboardPage;
