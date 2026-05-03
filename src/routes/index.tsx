import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { ProductTable } from "@/components/dashboard/ProductTable";
import { AiInsights } from "@/components/dashboard/AiInsights";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Marginflow" },
      { name: "description", content: "Track revenue, costs, ad spend, net profit and margin rate for your ecommerce store." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header title="Dashboard" />
        <main className="p-4 md:p-8 space-y-6">
          <KpiCards />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <AnalyticsChart />
            </div>
            <AiInsights />
          </div>
          <ProductTable />
        </main>
      </div>
    </div>
  );
}
