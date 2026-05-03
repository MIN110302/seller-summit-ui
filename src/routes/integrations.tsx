import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plug, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/integrations")({
  head: () => ({ meta: [{ title: "Integrations — Marginflow" }] }),
  component: IntegrationsPage,
});

type State = "Connected" | "Not Connected" | "Coming Soon";
const initial: { name: string; emoji: string; tag: string; desc: string; state: State; accent: string }[] = [
  { name: "Shopify", emoji: "🛍️", tag: "Storefront", desc: "Sync orders, products, and revenue from your Shopify store.", state: "Connected", accent: "from-emerald-500/15 to-emerald-500/5" },
  { name: "WooCommerce", emoji: "🟪", tag: "Storefront", desc: "Pull WooCommerce sales and refunds into Marginflow.", state: "Not Connected", accent: "from-violet-500/15 to-violet-500/5" },
  { name: "Amazon", emoji: "📦", tag: "Marketplace", desc: "Track FBA fees, refunds, and per-SKU profitability.", state: "Connected", accent: "from-amber-500/15 to-amber-500/5" },
  { name: "eBay", emoji: "🏷️", tag: "Marketplace", desc: "Import eBay listings, fees, and sales history.", state: "Not Connected", accent: "from-red-500/15 to-red-500/5" },
  { name: "TikTok Shop", emoji: "🎵", tag: "Marketplace", desc: "Connect TikTok Shop orders and ad attribution.", state: "Coming Soon", accent: "from-pink-500/15 to-pink-500/5" },
  { name: "Meta Ads", emoji: "📘", tag: "Ads", desc: "Match Facebook & Instagram ad spend to revenue.", state: "Connected", accent: "from-blue-500/15 to-blue-500/5" },
  { name: "Google Ads", emoji: "🔍", tag: "Ads", desc: "Sync Google Ads spend and ROAS automatically.", state: "Not Connected", accent: "from-sky-500/15 to-sky-500/5" },
  { name: "Stripe", emoji: "💳", tag: "Payments", desc: "Pull payment fees, payouts and chargebacks.", state: "Connected", accent: "from-indigo-500/15 to-indigo-500/5" },
  { name: "PayPal", emoji: "🅿️", tag: "Payments", desc: "Track PayPal transaction fees and refunds.", state: "Coming Soon", accent: "from-cyan-500/15 to-cyan-500/5" },
];

const stateStyle: Record<State, string> = {
  Connected: "bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/25",
  "Not Connected": "bg-secondary text-muted-foreground border-border",
  "Coming Soon": "bg-[color:var(--accent)]/10 text-[color:var(--accent)] border-[color:var(--accent)]/25",
};

function IntegrationsPage() {
  const [list, setList] = useState(initial);
  const toggle = (i: number) => {
    setList(prev => prev.map((x, idx) => idx === i && x.state !== "Coming Soon"
      ? { ...x, state: (x.state === "Connected" ? "Not Connected" : "Connected") as State }
      : x));
  };

  const connected = list.filter(x => x.state === "Connected").length;

  return (
    <DashboardLayout title="Integrations" subtitle="Connect your tools to unlock automated profit tracking">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardContent className="p-5"><div className="text-xs text-muted-foreground font-medium">Connected</div>
            <div className="text-2xl font-semibold mt-1">{connected} / {list.length}</div></CardContent>
        </Card>
        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardContent className="p-5"><div className="text-xs text-muted-foreground font-medium">Sources synced today</div>
            <div className="text-2xl font-semibold mt-1">14,210 events</div></CardContent>
        </Card>
        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardContent className="p-5"><div className="text-xs text-muted-foreground font-medium">Last sync</div>
            <div className="text-2xl font-semibold mt-1">2 min ago</div></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((it, i) => (
          <Card key={it.name} className="border-border/60 rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br", it.accent)}>
                  {it.emoji}
                </div>
                <Badge variant="outline" className={cn("rounded-full font-medium", stateStyle[it.state])}>
                  {it.state === "Connected" && <Check className="h-3 w-3 mr-1" />}
                  {it.state === "Coming Soon" && <Clock className="h-3 w-3 mr-1" />}
                  {it.state}
                </Badge>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold tracking-tight">{it.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{it.tag}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{it.desc}</p>
              </div>
              <Button
                variant={it.state === "Connected" ? "outline" : "default"}
                disabled={it.state === "Coming Soon"}
                onClick={() => toggle(i)}
                className="w-full mt-5 gap-2 rounded-lg"
              >
                <Plug className="h-4 w-4" />
                {it.state === "Connected" ? "Disconnect" : it.state === "Coming Soon" ? "Coming soon" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
