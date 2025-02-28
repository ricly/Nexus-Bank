"use client";

import { PropsWithChildren } from "react";
import { DesktopSidebar, MobileSidebar } from "./_components/sidebar";
import TopNav from "./_components/top-nav";

const DashboartLayout = ({ children }: PropsWithChildren) => {
  // useEffect(() => {
  //   location.replace("https://www.google.com");
  // }, []);

  return (
    <div className="h-screen overflow-hidden flex">
      <DesktopSidebar />
      <div className="flex-1">
        <MobileSidebar />
        <TopNav />
        <main className="pt-6 pb-44 h-screen overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboartLayout;
