"use client";

import { motion } from "framer-motion";
import { Shield, Lock, AlertCircle } from "lucide-react";

const SecuritySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Bank-Grade Security
            </h2>
            <p className="text-lg text-muted-foreground">
              Your security is our top priority. We employ multiple layers of
              protection to keep your money and data safe.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl border"
          >
            <Lock className="h-12 w-12 text-primary mb-6" />
            <h3 className="text-xl font-semibold mb-4">Advanced Encryption</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                256-bit encryption for all transactions
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Multi-factor authentication
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Biometric security options
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl border"
          >
            <Shield className="h-12 w-12 text-primary mb-6" />
            <h3 className="text-xl font-semibold mb-4">Fraud Protection</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                24/7 fraud monitoring
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Zero liability protection
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Real-time alerts
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
