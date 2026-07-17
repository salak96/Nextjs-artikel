import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardNavbar } from "@/components/dashboard/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar admin={admin} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar admin={admin} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
