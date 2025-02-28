"use client";

import LoadingComponent from "@/components/loading-component";
import useActiveUser from "@/hooks/auth/use-active-user";
import UserManagement from "../_components/user-management";

const UsersPage = () => {
  const { activeUser } = useActiveUser();

  if (!activeUser) return <LoadingComponent />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Management</h1>
      <UserManagement activeUser={activeUser} />
    </div>
  );
};

export default UsersPage;
