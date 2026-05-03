import { Header } from "@/components/dashboard/Header";
import type { ReactNode } from "react";

export function DashboardLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <main className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">{children}</main>
    </>
  );
}
