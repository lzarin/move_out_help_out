import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dashboardPath } from "@/lib/auth-utils";
import { DashboardNav } from "@/components/dashboard-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  return (
    <div className="flex min-h-screen flex-col bg-surface dark:bg-teal-950 lg:flex-row">
      <aside className="w-full border-b border-teal-200/80 bg-white dark:border-teal-900 dark:bg-teal-950 lg:w-56 lg:border-b-0 lg:border-r lg:py-4">
        <div className="px-4 lg:px-3">
          <DashboardNav role={session.user.role} />
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
