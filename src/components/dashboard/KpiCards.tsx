import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, Megaphone, Percent, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Total Revenue", value: "$48,920", delta: "+12.4%", up: true, hint: "vs last month", icon: DollarSign, tint: "bg-primary/10 text-primary" },
  { label: "Net Profit", value: "$13,840", delta: "+8.1%", up: true, hint: "vs last month", icon: TrendingUp, tint: "bg-[color:var(--success)]/15 text-[color:var(--success)]" },
  { label: "Avg. Margin Rate", value: "28.3%", delta: "-1.2%", up: false, hint: "vs last month", icon: Percent, tint: "bg-[color:var(--accent)]/15 text-[color:var(--accent)]" },
  { label: "Ad Spend", value: "$7,420", delta: "+18.0%", up: false, hint: "watch carefully", icon: Megaphone, tint: "bg-[color:var(--warning)]/15 text-[color:var(--warning)]" },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <Card key={k.label} className="border-border/70 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className={cn("p-2 rounded-lg", k.tint)}>
                <k.icon className="h-4 w-4" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                k.up ? "bg-[color:var(--success)]/10 text-[color:var(--success)]" : "bg-destructive/10 text-destructive"
              )}>
                {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {k.delta}
              </div>
            </div>
            <div className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{k.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{k.label}</div>
            <div className="mt-3 text-xs text-muted-foreground">{k.hint}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
