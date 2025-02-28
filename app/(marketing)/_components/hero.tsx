"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, Users } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  // useEffect(() => {
  //   location.replace("https://www.google.com");
  // }, []);
  return (
    <div className="relative overflow-hidden bg-gradient-to-b fom-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-5" /> */}
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <Building2 className="h-5 w-5" />
                <span className="text-sm font-medium">SecureBank</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Banking Made Simple, Secure, and Smart
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience the future of banking with SecureBank. Advanced
              security, seamless transactions, and personalized service — all in
              one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-lg">
                <Link href="/dashboard">
                  Open Account <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">2M+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center sm:col-span-1 col-span-2">
                <div className="text-3xl font-bold mb-1">A+</div>
                <div className="text-muted-foreground">Security Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                New Feature
              </div>
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Enhanced Security
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced encryption & protection
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Multi-factor authentication</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Real-time fraud detection</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10 transform rotate-6" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
