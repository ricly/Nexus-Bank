import { BarChart3, Lock, Wallet } from "lucide-react";
import React from "react";

const BenefitsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-purple-100 p-2 text-purple-600">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Secure Banking</h3>
            <p className="text-muted-foreground">
              Bank with confidence knowing your money is protected by
              state-of-the-art security systems.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-pink-100 p-2 text-pink-600">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Smart Payments</h3>
            <p className="text-muted-foreground">
              Send and receive money instantly with our intelligent payment
              processing system.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-orange-100 p-2 text-orange-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Financial Insights</h3>
            <p className="text-muted-foreground">
              Get detailed analytics and insights to help you make better
              financial decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
