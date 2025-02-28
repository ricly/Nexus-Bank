import { PropsWithChildren } from "react";
import AdminAuthGuard from "./_components/admin-auth-guard";
import AdminNav from "./_components/admin-nav";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <AdminNav />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </AdminAuthGuard>
  );
};

export default AdminLayout;
