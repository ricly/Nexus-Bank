import Logo from "@/components/logo";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import AuthLayoutContent from "./_components/content";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const user = await currentUser();

  if (user) redirect("/");

  return (
    <div className="h-screen overflow-hidden flex w-full justify-center">
      <div className="flex flex-col items-center w-[720px] max-h-full border-l-2 bg-white shadow-xl overflow-y-auto">
        <div className="container mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <Logo />
        </div>

        <div className="flex-1 grid place-items-center py-10">{children}</div>

        <div className="container mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 ">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SecureBank. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex-1 w-full hidden md:flex flex-col items-center justify-center p-8 relative">
        <Image
          src={"/images/bg-colored.jpg"}
          alt="."
          fill
          className="-z-20 object-cover"
        />

        <AuthLayoutContent />
      </div>
    </div>
  );
};

export default AuthLayout;
