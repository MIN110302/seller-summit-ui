import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, AlertTriangle, TrendingUp, AlertCircle } from "lucide-react";

const insights = [
  { icon: AlertTriangle, tint: "bg-[color:var(--warning)]/15 text-[color:var(--warning)]", text: "Your ad spend increased by 18% this week.", sub: "Review campaigns with rising CPA." },
  { icon: AlertCircle, tint: "bg-destructive/10 text-destructive", text: "3 products have margin rates below 15%.", sub: "Consider raising prices or cutting costs." },
  { icon: TrendingUp, tint: "bg-[color:var(--success)]/15 text-[color:var(--success)]", text: "Top performer: Wireless LED Lamp.", sub: "32% margin · $4,210 profit this month." },
  { icon: AlertTriangle, tint: "bg-[color:var(--warning)]/15 text-[color:var(--warning)]", text: "Portable Blender is approaching breakeven.", sub: "Ad spend is eating 46% of revenue." },
];

export function AiInsights() {
  return (
    <Card className="border-border/70 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[color:var(--accent)] text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          AI Insights
        </CardTitle>
        <p className="text-sm text-muted-foreground">Automated findings from your store data</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((i, idx) => (
          <div key={idx} className="flex gap-3 rounded-lg border border-border/70 bg-secondary/40 p-3">
            <div className={`p-2 rounded-md h-fit ${i.tint}`}>
              <i.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground leading-snug">{i.text}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{i.sub}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
