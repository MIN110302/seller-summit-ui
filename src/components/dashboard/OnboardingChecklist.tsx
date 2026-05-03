import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Circle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const items = [
  { id: "product", label: "Add your first product" },
  { id: "currency", label: "Set your default currency" },
  { id: "store", label: "Connect a store" },
  { id: "report", label: "Review your first margin report" },
  { id: "threshold", label: "Set margin warning threshold" },
];

const KEY = "mf:onboarding";

export function OnboardingChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({ currency: true, report: true });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setDone((d) => {
      const next = { ...d, [id]: !d[id] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const completed = items.filter((i) => done[i.id]).length;
  const pct = Math.round((completed / items.length) * 100);

  return (
    <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Get started
          </CardTitle>
          <span className="text-xs font-semibold text-primary">{completed}/{items.length}</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--gradient-primary)" }} />
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5">
        {items.map((i) => {
          const ok = !!done[i.id];
          return (
            <button
              key={i.id}
              onClick={() => toggle(i.id)}
              className="w-full flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-secondary/60 transition-colors text-left"
            >
              {ok ? (
                <span className="h-5 w-5 rounded-full bg-[color:var(--success)] text-white flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3" />
                </span>
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
              <span className={cn(ok && "line-through text-muted-foreground")}>{i.label}</span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
