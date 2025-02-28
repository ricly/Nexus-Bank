"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertCircle, ArrowDownRight, ArrowUpRight, Users } from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "24,589",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Active Today",
    value: "1,234",
    change: "+5%",
    trend: "up",
    icon: ArrowUpRight,
  },
  {
    label: "Failed Logins",
    value: "23",
    change: "-8%",
    trend: "down",
    icon: ArrowDownRight,
  },
  {
    label: "Pending Reviews",
    value: "45",
    change: "+2",
    trend: "up",
    icon: AlertCircle,
  },
];

export function DashboardStats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span
                className={cn(
                  "text-sm font-medium",
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                )}
              >
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
