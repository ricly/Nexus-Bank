"use client";

import LoadingComponent from "@/components/loading-component";
import useActiveUser from "@/hooks/auth/use-active-user";
import PendingApprovals from "./_components/pending-approvals";
import TransactionsCard from "./_components/transactions-card";
import { UserActivityChart } from "./_components/user-activity-chart";

const AdminPage = () => {
  const { activeUser } = useActiveUser();

  if (!activeUser) return <LoadingComponent />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {/* <DashboardStats /> */}
      <div className="grid lg:grid-cols-2 gap-8">
        <UserActivityChart />
        <PendingApprovals activeUser={activeUser} />
      </div>
      <TransactionsCard activeUser={activeUser} />
    </div>
  );
};

export default AdminPage;
