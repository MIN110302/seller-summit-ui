import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Marginflow" }] }),
  component: AnalyticsPage,
});

const trend = Array.from({ length: 30 }).map((_, i) => ({
  d: `${i + 1}`,
  revenue: 1200 + Math.round(Math.sin(i / 3) * 300 + i * 60 + Math.random() * 200),
  profit: 280 + Math.round(Math.sin(i / 4) * 80 + i * 18 + Math.random() * 80),
  margin: 22 + Math.round(Math.sin(i / 5) * 4 + Math.random() * 3),
  ads: 220 + Math.round(Math.cos(i / 3) * 100 + i * 8 + Math.random() * 60),
}));

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid oklch(0.92 0.01 258)",
  background: "white",
  boxShadow: "0 12px 32px -16px rgba(15,23,42,0.22)",
  fontSize: 12,
  padding: "10px 12px",
};

const summary = [
  { label: "Revenue", value: "$48,920", delta: "+12.4%", up: true },
  { label: "Net Profit", value: "$13,840", delta: "+8.1%", up: true },
  { label: "Avg Margin", value: "28.3%", delta: "-1.2%", up: false },
  { label: "Total Orders", value: "2,184", delta: "+6.7%", up: true },
];

function AnalyticsPage() {
  const [range, setRange] = useState("30");

  return (
    <DashboardLayout title="Analytics" subtitle="Deeper insight into your store's financial performance">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <Tabs value={range} onValueChange={setRange}>
          <TabsList className="bg-secondary/60">
            <TabsTrigger value="1">Today</TabsTrigger>
            <TabsTrigger value="7">7 Days</TabsTrigger>
            <TabsTrigger value="30">30 Days</TabsTrigger>
            <TabsTrigger value="90">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="sm" className="gap-2 rounded-lg w-fit border-border/70">
          <Download className="h-4 w-4" /> Export report
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map(s => (
          <Card key={s.label} className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
            <CardContent className="p-5">
              <div className="text-xs font-medium text-muted-foreground">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</div>
              <div className={cn("mt-2 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
                s.up ? "bg-[color:var(--success)]/10 text-[color:var(--success)]" : "bg-destructive/10 text-destructive")}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.delta}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader><CardTitle className="text-[15px]">Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 8, right: 8, left: -12 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.32 0.13 264)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="oklch(0.32 0.13 264)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" stroke="oklch(0.92 0.01 258)" vertical={false} />
                  <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="revenue" stroke="oklch(0.32 0.13 264)" strokeWidth={2.5} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader><CardTitle className="text-[15px]">Net Profit Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 8, right: 8, left: -12 }}>
                  <defs>
                    <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.72 0.18 145)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="oklch(0.72 0.18 145)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" stroke="oklch(0.92 0.01 258)" vertical={false} />
                  <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="profit" stroke="oklch(0.72 0.18 145)" strokeWidth={2.5} fill="url(#pf)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader><CardTitle className="text-[15px]">Margin Rate Over Time</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend} margin={{ top: 8, right: 8, left: -12 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke="oklch(0.92 0.01 258)" vertical={false} />
                  <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="margin" stroke="oklch(0.74 0.13 215)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader><CardTitle className="text-[15px]">Ad Spend vs Profit</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend.slice(-14)} margin={{ top: 8, right: 8, left: -12 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke="oklch(0.92 0.01 258)" vertical={false} />
                  <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="ads" name="Ad Spend" fill="oklch(0.78 0.16 75)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="profit" name="Net Profit" fill="oklch(0.32 0.13 264)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
