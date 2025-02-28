"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CtaSection = () => {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Experience Modern Banking?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of satisfied customers who trust SecureBank with
              their financial needs. Open your account today and enjoy banking
              that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/register">
                  Open Free Account <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to transform your banking experience?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Join thousands of satisfied customers who have already made the
              switch.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Button
              asChild
              className="bg-primary text-white hover:bg-primary/90 shadow-2xl"
            >
              <Link href={"/dashboard"}>Open an Account</Link>
            </Button>
            <Button variant="outline">Contact Sales</Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default CtaSection;
