"use client";

import LoadingComponent from "@/components/loading-component";
import VerifyAccountOverlay from "@/components/verify-account-overlay";
import useActiveUser from "@/hooks/auth/use-active-user";
import { useRouter } from "next/navigation";

const CardsPage = () => {
  const { activeUser, isLoaded } = useActiveUser();
  const router = useRouter();

  if (activeUser === undefined || !isLoaded) return <LoadingComponent />;

  if (!activeUser) {
    router.push("/sign-in");
    return null;
  }
  return (
    <div className="relative min-h-screen">
      <VerifyAccountOverlay activeUser={activeUser} />
    </div>
  );
};

export default CardsPage;
