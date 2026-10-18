import * as React from "react";
import { getOptionalUser } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Admin — Daniel Ametsowou",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getOptionalUser();

  // If user is not authenticated or not admin, redirect to login
  if (!user || user.role !== "admin") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-6 sm:p-10 md:p-12 select-none">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 flex-1">
        <AdminNav userEmail={user.email} />
        <main className="flex-1 flex flex-col min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
