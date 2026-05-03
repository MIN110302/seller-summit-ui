import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, MapPin, Mail, Phone, Camera, Sparkles, Zap, CreditCard, Download } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Marginflow" }] }),
  component: ProfilePage,
});

const usage = [
  { label: "Tracked products", value: 142, max: 500, color: "bg-primary" },
  { label: "Connected stores", value: 3, max: 10, color: "bg-[color:var(--accent)]" },
  { label: "AI insights this month", value: 87, max: 200, color: "bg-[color:var(--success)]" },
];

const invoices = [
  { date: "Apr 1, 2026", amount: "$49.00", status: "Paid" },
  { date: "Mar 1, 2026", amount: "$49.00", status: "Paid" },
  { date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
  { date: "Jan 1, 2026", amount: "$29.00", status: "Paid" },
];

function ProfilePage() {
  return (
    <DashboardLayout title="Profile" subtitle="Your account, plan, and billing overview">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          <div className="h-24 relative" style={{ background: "var(--gradient-primary)" }}>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          </div>
          <CardContent className="-mt-12 relative">
            <div className="flex items-end justify-between">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-card">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">AK</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <Badge variant="outline" className="rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] border-[color:var(--accent)]/25 gap-1.5">
                <Crown className="h-3 w-3" /> Pro Plan
              </Badge>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold tracking-tight">Alex Kim</h2>
              <p className="text-sm text-muted-foreground">Founder · Marginflow Co.</p>
            </div>
            <div className="mt-5 space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-muted-foreground"><Mail className="h-4 w-4" /> alex@marginflow.shop</div>
              <div className="flex items-center gap-2.5 text-muted-foreground"><Phone className="h-4 w-4" /> +1 (415) 555-0142</div>
              <div className="flex items-center gap-2.5 text-muted-foreground"><MapPin className="h-4 w-4" /> San Francisco, CA</div>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2 border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-[15px]">Account details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>First name</Label><Input defaultValue="Alex" className="h-10 rounded-lg" /></div>
              <div className="space-y-1.5"><Label>Last name</Label><Input defaultValue="Kim" className="h-10 rounded-lg" /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="alex@marginflow.shop" className="h-10 rounded-lg" /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+1 (415) 555-0142" className="h-10 rounded-lg" /></div>
              <div className="space-y-1.5 md:col-span-2"><Label>Job title</Label><Input defaultValue="Founder & Operator" className="h-10 rounded-lg" /></div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" className="rounded-lg">Cancel</Button>
              <Button className="rounded-lg">Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card
          className="xl:col-span-2 border-0 rounded-2xl text-primary-foreground relative overflow-hidden"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" /> Current Plan
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mt-2">Pro · $49/month</h3>
                <p className="text-sm opacity-90 mt-1">Unlimited products, AI insights, and integrations.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white/15 border-white/20 text-primary-foreground hover:bg-white/25 rounded-lg">Manage plan</Button>
                <Button className="bg-white text-primary hover:bg-white/90 rounded-lg gap-2"><Zap className="h-4 w-4" />Upgrade</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              {usage.map(u => (
                <div key={u.label} className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
                  <div className="text-xs opacity-80">{u.label}</div>
                  <div className="text-xl font-semibold tracking-tight mt-1">{u.value} <span className="text-sm opacity-70">/ {u.max}</span></div>
                  <div className="h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${(u.value / u.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="flex items-center gap-2 text-[15px]"><CreditCard className="h-4 w-4" /> Payment method</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="rounded-xl border border-border/60 bg-secondary/40 p-4 flex items-center gap-3">
              <div className="h-10 w-14 rounded-md bg-gradient-to-br from-primary to-[color:var(--accent)] flex items-center justify-center text-primary-foreground text-[10px] font-semibold">VISA</div>
              <div className="flex-1">
                <div className="text-sm font-medium">•••• •••• •••• 4242</div>
                <div className="text-xs text-muted-foreground">Expires 09/28</div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="text-sm text-muted-foreground">Next billing: <span className="text-foreground font-medium">May 1, 2026</span></div>
            <Button variant="outline" className="w-full rounded-lg">Add payment method</Button>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3 border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-4">
            <CardTitle className="text-[15px]">Billing history</CardTitle>
            <Button variant="outline" size="sm" className="gap-2 rounded-lg"><Download className="h-4 w-4" /> Download all</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/60">
              {invoices.map((inv, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/40 transition-colors">
                  <div>
                    <div className="text-sm font-medium">Pro Plan — Monthly</div>
                    <div className="text-xs text-muted-foreground">{inv.date}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="rounded-full bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/25">{inv.status}</Badge>
                    <span className="text-sm font-semibold tabular-nums w-16 text-right">{inv.amount}</span>
                    <Button variant="ghost" size="sm">Invoice</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
