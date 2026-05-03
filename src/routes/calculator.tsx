import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Info, RotateCcw, TrendingUp, Target, Percent, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calculator")({
  head: () => ({ meta: [{ title: "Profit Calculator — Marginflow" }] }),
  component: CalculatorPage,
});

const defaults = { price: 39.9, cost: 8.5, shipping: 3.2, fees: 1.8, ads: 6.4, refund: 3, other: 0.5 };

function Field({ label, value, onChange, prefix, suffix, hint }: {
  label: string; value: number; onChange: (v: number) => void; prefix?: string; suffix?: string; hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={cn("h-11 rounded-lg bg-secondary/40 border-border/70", prefix && "pl-7", suffix && "pr-10")}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function CalculatorPage() {
  const [v, setV] = useState(defaults);
  const set = (k: keyof typeof defaults) => (val: number) => setV({ ...v, [k]: val });

  const calc = useMemo(() => {
    const refundCost = v.price * (v.refund / 100);
    const totalCost = v.cost + v.shipping + v.fees + v.ads + v.other + refundCost;
    const profit = v.price - totalCost;
    const margin = v.price > 0 ? (profit / v.price) * 100 : 0;
    const breakeven = totalCost;
    const roi = v.ads > 0 ? (profit / v.ads) * 100 : 0;
    let status: "profitable" | "low" | "losing" = "profitable";
    if (profit < 0) status = "losing";
    else if (margin < 15) status = "low";
    return { profit, margin, breakeven, roi, totalCost, status };
  }, [v]);

  const statusStyles = {
    profitable: { bg: "var(--gradient-primary)", label: "✓ Profitable", text: "Healthy margin — scale this product." },
    low: { bg: "linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.85 0.14 80))", label: "⚠ Low Margin", text: "Margin is thin — review costs or pricing." },
    losing: { bg: "linear-gradient(135deg, oklch(0.65 0.22 25), oklch(0.7 0.2 20))", label: "✕ Losing Money", text: "Costs exceed revenue. Action required." },
  } as const;

  const result = statusStyles[calc.status];

  const resultCards = [
    { label: "Net Profit", value: `$${calc.profit.toFixed(2)}`, icon: TrendingUp, accent: calc.profit >= 0 ? "text-[color:var(--success)]" : "text-destructive", bg: calc.profit >= 0 ? "bg-[color:var(--success)]/10" : "bg-destructive/10" },
    { label: "Margin Rate", value: `${calc.margin.toFixed(1)}%`, icon: Percent, accent: "text-primary", bg: "bg-primary/10" },
    { label: "Break-Even Price", value: `$${calc.breakeven.toFixed(2)}`, icon: Target, accent: "text-[color:var(--accent)]", bg: "bg-[color:var(--accent)]/10" },
    { label: "Ad ROI", value: `${calc.roi.toFixed(0)}%`, icon: DollarSign, accent: calc.roi >= 100 ? "text-[color:var(--success)]" : "text-[color:var(--warning)]", bg: calc.roi >= 100 ? "bg-[color:var(--success)]/10" : "bg-[color:var(--warning)]/10" },
  ];

  return (
    <DashboardLayout title="Profit Calculator" subtitle="Estimate margins before listing or scaling a product">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Calculator className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-[17px] font-semibold tracking-tight">Inputs</CardTitle>
                <p className="text-sm text-muted-foreground">All values update results instantly</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2 rounded-lg" onClick={() => setV(defaults)}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Selling Price" value={v.price} onChange={set("price")} prefix="$" />
              <Field label="Product Cost" value={v.cost} onChange={set("cost")} prefix="$" />
              <Field label="Shipping Fee" value={v.shipping} onChange={set("shipping")} prefix="$" />
              <Field label="Platform Fee" value={v.fees} onChange={set("fees")} prefix="$" hint="Stripe, Shopify, marketplace" />
              <Field label="Ad Spend / Unit" value={v.ads} onChange={set("ads")} prefix="$" />
              <Field label="Refund Rate" value={v.refund} onChange={set("refund")} suffix="%" hint="Estimated chargeback / refunds" />
              <Field label="Other Costs" value={v.other} onChange={set("other")} prefix="$" hint="Packaging, returns, etc." />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card
            className="border-0 rounded-2xl text-primary-foreground relative overflow-hidden"
            style={{ background: result.bg, boxShadow: "var(--shadow-elegant)" }}
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <CardContent className="p-6 relative">
              <div className="text-xs font-semibold uppercase tracking-wider opacity-90">{result.label}</div>
              <div className="mt-3 text-4xl font-semibold tracking-tight">${calc.profit.toFixed(2)}</div>
              <div className="mt-1 text-sm opacity-90">{calc.margin.toFixed(1)}% margin per unit</div>
              <div className="mt-4 text-sm opacity-90 leading-relaxed">{result.text}</div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {resultCards.map(r => (
              <Card key={r.label} className="border-border/60 rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center mb-2", r.bg)}>
                    <r.icon className={cn("h-4 w-4", r.accent)} />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{r.label}</div>
                  <div className="text-lg font-semibold tracking-tight mt-0.5">{r.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[15px] font-semibold">
            <Info className="h-4 w-4 text-primary" /> How the calculation works
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
            <div className="font-semibold mb-1">Total Costs</div>
            <code className="text-xs text-muted-foreground">cost + shipping + fees + ads + other + (price × refund%)</code>
          </div>
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
            <div className="font-semibold mb-1">Net Profit</div>
            <code className="text-xs text-muted-foreground">price − total costs</code>
          </div>
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
            <div className="font-semibold mb-1">Margin Rate</div>
            <code className="text-xs text-muted-foreground">(net profit ÷ price) × 100</code>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
