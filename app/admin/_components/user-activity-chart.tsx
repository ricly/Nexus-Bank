"use client";

import { Card } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "2024-03-01", users: 1200 },
  { date: "2024-03-02", users: 1350 },
  { date: "2024-03-03", users: 1400 },
  { date: "2024-03-04", users: 1300 },
  { date: "2024-03-05", users: 1500 },
  { date: "2024-03-06", users: 1600 },
  { date: "2024-03-07", users: 1750 },
];

export function UserActivityChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">User Activity</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
