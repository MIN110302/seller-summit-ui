import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp } from "lucide-react";
import { usePreferences } from "@/lib/preferences";

export function ProfitGoal() {
  const { format } = usePreferences();
  const current = 13840;
  const goal = 20000;
  const pct = Math.min(100, Math.round((current / goal) * 100));
  const remaining = Math.max(0, goal - current);

  return (
    <Card
      className="relative overflow-hidden border-0 rounded-2xl text-primary-foreground"
      style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      <CardContent className="p-5 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-90">
            <Target className="h-4 w-4" /> Monthly profit goal
          </div>
          <span className="text-xs font-semibold opacity-90">{pct}%</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <div className="text-3xl font-semibold tracking-tight">{format(current, { decimals: 0 })}</div>
          <div className="text-sm opacity-80">/ {format(goal, { decimals: 0 })}</div>
        </div>
        <div className="h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
          <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 text-xs opacity-90 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5" />
          {format(remaining, { decimals: 0 })} to go — scale top performers by ~20% to hit target.
        </div>
      </CardContent>
    </Card>
  );
}
