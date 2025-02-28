"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useActiveUser from "@/hooks/auth/use-active-user";
import { UserButton } from "@clerk/nextjs";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const TopNav = () => {
  const pathname = usePathname();
  const { activeUser } = useActiveUser();

  return (
    <header className="border-b md:px-6 py-3">
      <div className="container md:max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col space-y-1">
          {pathname === "/dashboard" ? (
            <>
              <h1 className="text-xl font-semibold">
                Hello {activeUser?.firstName || "--"}, 👋
              </h1>
              <p className="text-muted-foreground text-sm">
                Send, save and receive funds in various currencies
              </p>
            </>
          ) : (
            <h1 className="text-xl font-semibold capitalize">
              {pathname?.split("/")?.pop()?.replace(/-/g, " ")}
            </h1>
          )}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">See our rates</Button>
          <Select defaultValue="en-US">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <UserButton signInUrl="/sign-in" userProfileUrl="/dashboard" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
