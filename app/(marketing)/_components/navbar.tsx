"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className=" bg-zinc-950 text-white">
      {/* <NewsletterSignup /> */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />
        <nav className="hidden lg:flex gap-8">
          <Link
            href="/dashboard"
            className="text-sm hover:text-emerald-400 transition-colors"
          >
            Personal
          </Link>
          <Link
            href="/dashboard"
            className="text-sm hover:text-emerald-400 transition-colors"
          >
            Business
          </Link>
          <Link
            href="/dashboard"
            className="text-sm hover:text-emerald-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/dashboard"
            className="text-sm hover:text-emerald-400 transition-colors"
          >
            Security
          </Link>
          <Link
            href="/dashboard"
            className="text-sm hover:text-emerald-400 transition-colors"
          >
            Support
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:flex border-emerald-400 text-black"
            asChild
          >
            <Link href="/dashboard">Log in</Link>
          </Button>
          <Button className="bg-emerald-400 text-zinc-950 hover:bg-emerald-500">
            <Link href="/dashboard">Open Account</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
