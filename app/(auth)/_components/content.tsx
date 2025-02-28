"use client";

import { Badge } from "@/components/ui/badge";
import { TypeAnimation } from "react-type-animation";

const AuthLayoutContent = () => {
  return (
    <div className="w-[720px]">
      <Badge className="inline-fl ex backdrop-blur-sm bg-transparent border-primary text-primary mb-10 hidden">
        New Feature: Instant Transfers
      </Badge>

      <h1 className="text-gravel md:text-4xl font-bold">
        <TypeAnimation
          sequence={[
            "Receive your payments faster",
            2000,
            "Instantly convert between currencies",
            2000,
            "Spend globally with your Dollar card",
            2000,
          ]}
          wrapper="span"
          speed={50}
          style={{ display: "inline-block" }}
          repeat={Infinity}
        />
      </h1>

      <p className="text-iridium md:text-sm mt-4">
        Open a global bank account to send and receive
        <br />
        payments in minutes
      </p>
    </div>
  );
};

export default AuthLayoutContent;
