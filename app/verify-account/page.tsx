"use client";

import LoadingComponent from "@/components/loading-component";
import useActiveUser from "@/hooks/auth/use-active-user";
import { useRouter } from "next/navigation";
import VerifyAccountContent from "./_components/content";

export default function VerifyAccountPage() {
  const { activeUser } = useActiveUser();
  const router = useRouter();

  if (activeUser === undefined) return <LoadingComponent />;

  if (!activeUser) {
    router.push("/sign-in");
    return null;
  }

  return <VerifyAccountContent />;
}
