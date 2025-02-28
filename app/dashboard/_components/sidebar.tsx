"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  FileText,
  Home,
  MenuIcon,
  PieChart,
  Receipt,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Accounts", href: "/dashboard/accounts", icon: Wallet },
  { name: "Payments", href: "/dashboard/payments", icon: Receipt },
  { name: "Transactions", href: "/dashboard/transactions", icon: FileText },
  { name: "Cards", href: "#", icon: CreditCard },
  { name: "Reports & Statements", href: "#", icon: PieChart },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
  return (
    <>
      <Logo />

      <Separator />

      <nav className="space-y-1">
        {navigation.map((item) => {
          const current = item.href === pathname;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onClose?.()}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-lg",
                current
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export const DesktopSidebar = () => {
  return (
    <div className="hidden md:block w-64 border-r bg-gray-50/40 p-4 space-y-4">
      <Sidebar />
    </div>
  );
};

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <div className="md:hidden block border-separate bg-background">
      <nav className="flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="w-[320px] sm:w-[500px] space-y-4"
            side={"left"}
          >
            <Sidebar onClose={onClose} />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
