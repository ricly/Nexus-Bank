import { Arrow } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={"/"}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to dashboard
          </Link>
        </div>
      </div>

      <footer className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please contact our support team at
          support@example.com
        </p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
