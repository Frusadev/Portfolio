import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Security by obscurity: invalid users see 404 instead of 403 or redirect
  if (!session || session.user.role !== "admin") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#e6dcc6]">
      <AdminSidebar />
      <main className="md:ml-64 p-4 md:p-8 min-h-screen pt-20 md:pt-8 w-full md:w-auto">
        {children}
      </main>
    </div>
  );
}
