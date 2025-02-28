"use client";

import LoadingComponent from "@/components/loading-component";
import useActiveUser from "@/hooks/auth/use-active-user";
import { ADMINS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { activeUser } = useActiveUser();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   location.replace("https://www.google.com");
  // }, []);

  useEffect(() => {
    if (!activeUser) return;

    // Simulate auth check with dummy data
    const checkAuth = () => {
      if (ADMINS.some((admin) => activeUser.email === admin)) {
        setIsAuthorized(true);
      } else {
        router.push("/dashboard");
      }
    };

    checkAuth();
  }, [router, activeUser]);

  if (activeUser === undefined) return <LoadingComponent />;

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
