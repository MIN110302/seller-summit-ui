import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div>
          <CardTitle className="text-base font-semibold">Profit & Margin</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Net profit and margin rate over time</p>
        </div>
        <Tabs defaultValue="30">
          <TabsList>
            <TabsTrigger value="1">Today</TabsTrigger>
            <TabsTrigger value="7">7D</TabsTrigger>
            <TabsTrigger value="30">30D</TabsTrigger>
            <TabsTrigger value="90">90D</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.32 0.13 264)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="oklch(0.32 0.13 264)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 258)" vertical={false} />
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.55 0.03 258)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.55 0.03 258)" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid oklch(0.92 0.01 258)",
                  background: "white",
                  boxShadow: "0 8px 24px -12px rgba(15,23,42,0.18)",
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="profit" stroke="oklch(0.32 0.13 264)" strokeWidth={2.5} fill="url(#profitFill)" />
              <Line type="monotone" dataKey="margin" stroke="oklch(0.74 0.13 215)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
