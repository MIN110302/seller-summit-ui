import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import type { ReactNode } from "react";

export function DashboardLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{ background: "var(--gradient-surface)" }}
      />
      <Sidebar />
      <div className="lg:pl-64">
        <Header title={title} subtitle={subtitle} />
        <main className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
