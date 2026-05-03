import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, Megaphone, Percent, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  {
    label: "Total Revenue",
    value: "$48,920",
    delta: "+12.4%",
    up: true,
    hint: "vs last 30 days",
    icon: DollarSign,
    iconBg: "from-primary/15 to-primary/5",
    iconColor: "text-primary",
    spark: [12, 14, 13, 16, 18, 17, 22, 24, 28, 30],
    accent: "var(--primary)",
  },
  {
    label: "Net Profit",
    value: "$13,840",
    delta: "+8.1%",
    up: true,
    hint: "vs last 30 days",
    icon: TrendingUp,
    iconBg: "from-[color:var(--success)]/20 to-[color:var(--success)]/5",
    iconColor: "text-[color:var(--success)]",
    spark: [8, 10, 9, 12, 14, 13, 15, 17, 19, 22],
    accent: "var(--success)",
  },
  {
    label: "Avg. Margin Rate",
    value: "28.3%",
    delta: "-1.2%",
    up: false,
    hint: "vs last 30 days",
    icon: Percent,
    iconBg: "from-[color:var(--accent)]/20 to-[color:var(--accent)]/5",
    iconColor: "text-[color:var(--accent)]",
    spark: [30, 29, 31, 30, 28, 29, 27, 28, 28, 28],
    accent: "var(--accent)",
  },
  {
    label: "Ad Spend",
    value: "$7,420",
    delta: "+18.0%",
    up: false,
    hint: "watch carefully",
    icon: Megaphone,
    iconBg: "from-[color:var(--warning)]/20 to-[color:var(--warning)]/5",
    iconColor: "text-[color:var(--warning)]",
    spark: [10, 11, 12, 14, 13, 16, 18, 20, 22, 24],
    accent: "var(--warning)",
  },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPts = `0,${h} ${pts} ${w},${h}`;
  const id = `g-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={`color-mix(in oklab, ${color} 40%, transparent)`} />
          <stop offset="100%" stopColor={`color-mix(in oklab, ${color} 0%, transparent)`} />
        </linearGradient>
      </defs>
      <polygon points={areaPts} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <Card
          key={k.label}
          className="relative overflow-hidden border-border/60 rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className={cn("p-2.5 rounded-xl bg-gradient-to-br", k.iconBg)}>
                <k.icon className={cn("h-[18px] w-[18px]", k.iconColor)} />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full",
                  k.up
                    ? "bg-[color:var(--success)]/10 text-[color:var(--success)]"
                    : "bg-destructive/10 text-destructive",
                )}
              >
                {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {k.delta}
              </div>
            </div>
            <div className="mt-5 text-[13px] font-medium text-muted-foreground">{k.label}</div>
            <div className="mt-1 text-[26px] font-semibold tracking-tight text-foreground leading-tight">
              {k.value}
            </div>
            <div className="mt-3">
              <Sparkline data={k.spark} color={`var(--${k.accent.includes("var") ? k.accent.replace(/var\(--|\)/g, "") : k.accent})`} />
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">{k.hint}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
