import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { d: "Apr 1", profit: 820, margin: 24 },
  { d: "Apr 5", profit: 1120, margin: 26 },
  { d: "Apr 9", profit: 980, margin: 23 },
  { d: "Apr 13", profit: 1380, margin: 28 },
  { d: "Apr 17", profit: 1610, margin: 30 },
  { d: "Apr 21", profit: 1450, margin: 27 },
  { d: "Apr 25", profit: 1820, margin: 31 },
  { d: "Apr 29", profit: 2040, margin: 33 },
  { d: "May 3", profit: 2180, margin: 34 },
];

export function AnalyticsChart() {
  return (
    <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-[17px] font-semibold tracking-tight">Profit & Margin</CardTitle>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[color:var(--success)]/10 text-[color:var(--success)]">
              Trending up
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Net profit and margin rate over time</p>
          <div className="flex items-center gap-6 mt-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> Net Profit
              </div>
              <div className="text-xl font-semibold tracking-tight mt-0.5">$13,840</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" /> Margin Rate
              </div>
              <div className="text-xl font-semibold tracking-tight mt-0.5">28.3%</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="30">
            <TabsList className="bg-secondary/60">
              <TabsTrigger value="1">Today</TabsTrigger>
              <TabsTrigger value="7">7D</TabsTrigger>
              <TabsTrigger value="30">30D</TabsTrigger>
              <TabsTrigger value="90">90D</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" className="rounded-lg gap-2 border-border/70">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.32 0.13 264)" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="oklch(0.32 0.13 264)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="marginFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.74 0.13 215)" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="oklch(0.74 0.13 215)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="oklch(0.92 0.01 258)" vertical={false} />
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.55 0.03 258)" }} dy={6} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.55 0.03 258)" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid oklch(0.92 0.01 258)",
                  background: "white",
                  boxShadow: "0 12px 32px -16px rgba(15,23,42,0.22)",
                  fontSize: 12,
                  padding: "10px 12px",
                }}
                cursor={{ stroke: "oklch(0.74 0.13 215)", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area type="monotone" dataKey="profit" stroke="oklch(0.32 0.13 264)" strokeWidth={2.5} fill="url(#profitFill)" activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }} />
              <Line type="monotone" dataKey="margin" stroke="oklch(0.74 0.13 215)" strokeWidth={2.25} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
