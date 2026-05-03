import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { ProductTable } from "@/components/dashboard/ProductTable";
import { AiInsights } from "@/components/dashboard/AiInsights";
import { OnboardingChecklist } from "@/components/dashboard/OnboardingChecklist";
import { ProfitGoal } from "@/components/dashboard/ProfitGoal";

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
    <DashboardLayout title="Dashboard">
      <KpiCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <AnalyticsChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfitGoal />
            <OnboardingChecklist />
          </div>
        </div>
        <AiInsights />
      </div>
      <ProductTable />
    </DashboardLayout>
  );
}
