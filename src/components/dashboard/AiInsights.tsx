import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, AlertTriangle, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    icon: AlertTriangle,
    tint: "bg-[color:var(--warning)]/12 text-[color:var(--warning)]",
    title: "Ad spend up 18% this week",
    sub: "Three campaigns are driving rising CPA. Review targeting and pause underperformers.",
    tag: "Cost alert",
  },
  {
    icon: AlertCircle,
    tint: "bg-destructive/10 text-destructive",
    title: "3 products below 15% margin",
    sub: "Consider raising prices by 8–12% or renegotiating supplier costs to protect profit.",
    tag: "Margin risk",
  },
  {
    icon: TrendingUp,
    tint: "bg-[color:var(--success)]/15 text-[color:var(--success)]",
    title: "Top performer: Wireless LED Lamp",
    sub: "32% margin · $4,210 profit this month. Scale ad budget by ~20%.",
    tag: "Opportunity",
  },
  {
    icon: AlertTriangle,
    tint: "bg-[color:var(--warning)]/12 text-[color:var(--warning)]",
    title: "Portable Blender near breakeven",
    sub: "Ad spend is consuming 46% of revenue. Test a lower-CPC creative.",
    tag: "Watchlist",
  },
];

export function AiInsights() {
  return (
    <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)] h-full overflow-hidden">
      <div
        className="relative px-6 pt-6 pb-5 text-primary-foreground"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-6 bottom-2 opacity-30">
          <Sparkles className="h-16 w-16" />
        </div>
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-[15px] font-semibold text-primary-foreground">AI Margin Assistant</CardTitle>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/15">BETA</span>
            </div>
            <p className="text-xs text-primary-foreground/75 mt-0.5">Smart insights on margin risks, ad spend, and pricing</p>
          </div>
        </div>
      </div>
      <CardContent className="p-4 space-y-2.5">
        {insights.map((i, idx) => (
          <div
            key={idx}
            className="group flex gap-3 rounded-xl border border-border/60 bg-card hover:bg-secondary/40 hover:border-border transition-all p-3.5"
          >
            <div className={`p-2 rounded-lg h-fit shrink-0 ${i.tint}`}>
              <i.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {i.tag}
                </span>
              </div>
              <div className="text-[13.5px] font-medium text-foreground leading-snug">{i.title}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{i.sub}</div>
            </div>
          </div>
        ))}
        <Button variant="ghost" className="w-full justify-between mt-2 text-primary hover:bg-primary/5">
          View all insights <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
