"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart3, Bell, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Users },
  // { href: "/admin/security", label: "Security", icon: Shield },
];

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo href="/admin" />

            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" asChild>
              <Link href={"/"}>Sign Out</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
