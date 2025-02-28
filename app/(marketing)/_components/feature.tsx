"use client";

import { motion } from "framer-motion";
import { CreditCard, Smartphone, PiggyBank, LineChart } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Smart Banking Cards",
    description:
      "Contactless payments, instant notifications, and complete control over your spending.",
  },
  {
    icon: Smartphone,
    title: "Mobile Banking",
    description:
      "Manage your accounts, transfer money, and pay bills from anywhere, anytime.",
  },
  {
    icon: PiggyBank,
    title: "Savings Goals",
    description:
      "Set and track your savings goals with automated transfers and progress tracking.",
  },
  {
    icon: LineChart,
    title: "Investment Tools",
    description:
      "Access advanced investment tools and real-time market data to grow your wealth.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience banking that adapts to your lifestyle with our
            comprehensive suite of features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative bg-card p-6 rounded-2xl border shadow-sm">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
