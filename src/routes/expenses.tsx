import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, Truck, CreditCard, Wrench, RefreshCw, Box, Plus, Crown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/expenses")({
  head: () => ({ meta: [{ title: "Expenses — Marginflow" }] }),
  component: ExpensesPage,
});

const categories = [
  { key: "Ads", icon: Megaphone, value: 7420, change: "+18%", color: "text-[color:var(--warning)]", bg: "bg-[color:var(--warning)]/10" },
  { key: "Shipping", icon: Truck, value: 2180, change: "+4%", color: "text-primary", bg: "bg-primary/10" },
  { key: "Platform Fees", icon: CreditCard, value: 1560, change: "+9%", color: "text-[color:var(--accent)]", bg: "bg-[color:var(--accent)]/10" },
  { key: "Software", icon: Wrench, value: 320, change: "0%", color: "text-muted-foreground", bg: "bg-secondary" },
  { key: "Refunds", icon: RefreshCw, value: 410, change: "-12%", color: "text-destructive", bg: "bg-destructive/10" },
  { key: "Other", icon: Box, value: 240, change: "+2%", color: "text-muted-foreground", bg: "bg-secondary" },
];

const monthly = [
  { m: "Nov", Ads: 5800, Shipping: 1900, Fees: 1300, Other: 700 },
  { m: "Dec", Ads: 6500, Shipping: 2100, Fees: 1400, Other: 760 },
  { m: "Jan", Ads: 6900, Shipping: 1950, Fees: 1480, Other: 820 },
  { m: "Feb", Ads: 6200, Shipping: 2050, Fees: 1500, Other: 800 },
  { m: "Mar", Ads: 7100, Shipping: 2090, Fees: 1520, Other: 880 },
  { m: "Apr", Ads: 7420, Shipping: 2180, Fees: 1560, Other: 970 },
];

const expenses = [
  { date: "May 2", desc: "Meta Ads — Spring Campaign", cat: "Ads", amount: 420.5 },
  { date: "May 1", desc: "Shopify Subscription", cat: "Software", amount: 39.0 },
  { date: "Apr 30", desc: "USPS Shipping Labels", cat: "Shipping", amount: 184.2 },
  { date: "Apr 29", desc: "Stripe Processing Fees", cat: "Platform Fees", amount: 96.8 },
  { date: "Apr 28", desc: "Google Ads — Search", cat: "Ads", amount: 312.4 },
  { date: "Apr 27", desc: "Customer Refund #5512", cat: "Refunds", amount: 49.0 },
  { date: "Apr 26", desc: "Packaging Supplier", cat: "Other", amount: 128.5 },
];

function ExpensesPage() {
  const [open, setOpen] = useState(false);
  const total = categories.reduce((a, c) => a + c.value, 0);
  const top = categories.reduce((a, c) => (c.value > a.value ? c : a));

  return (
    <DashboardLayout title="Expenses" subtitle="Track every dollar leaving your business">
      <Card
        className="border-0 rounded-2xl text-primary-foreground relative overflow-hidden"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
      >
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <CardContent className="p-6 relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-80 font-semibold">Total expenses · this month</div>
            <div className="text-4xl font-semibold tracking-tight mt-2">${total.toLocaleString()}</div>
            <div className="text-sm opacity-90 mt-1 flex items-center gap-2">
              <Crown className="h-4 w-4" /> Largest category: <span className="font-semibold">{top.key}</span> (${top.value.toLocaleString()})
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-primary hover:bg-white/90 gap-2 rounded-lg">
                <Plus className="h-4 w-4" /> Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Input placeholder="e.g. Meta Ads — May Campaign" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Category</Label>
                    <Select defaultValue="Ads">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categories.map(c => <SelectItem key={c.key} value={c.key}>{c.key}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Amount</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Save expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {categories.map(c => (
          <Card key={c.key} className={cn("border-border/60 rounded-2xl shadow-[var(--shadow-card)] relative", c.key === top.key && "ring-2 ring-primary/40")}>
            <CardContent className="p-4">
              <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center", c.bg)}>
                <c.icon className={cn("h-4 w-4", c.color)} />
              </div>
              <div className="mt-3 text-xs text-muted-foreground font-medium">{c.key}</div>
              <div className="text-lg font-semibold tracking-tight">${c.value.toLocaleString()}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{c.change} vs last month</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader><CardTitle className="text-[15px]">Monthly breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} margin={{ top: 8, right: 8, left: -12 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke="oklch(0.92 0.01 258)" vertical={false} />
                  <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.03 258)" }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 258)", background: "white", fontSize: 12 }} />
                  <Bar dataKey="Ads" stackId="a" fill="oklch(0.78 0.16 75)" />
                  <Bar dataKey="Shipping" stackId="a" fill="oklch(0.32 0.13 264)" />
                  <Bar dataKey="Fees" stackId="a" fill="oklch(0.74 0.13 215)" />
                  <Bar dataKey="Other" stackId="a" fill="oklch(0.85 0.02 258)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
          <CardHeader><CardTitle className="text-[15px]">Category share</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {categories.map(c => {
              const pct = (c.value / total) * 100;
              return (
                <div key={c.key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{c.key}</span>
                    <span className="text-muted-foreground tabular-nums">{pct.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-[15px]">Recent expenses</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/60">
                <TableHead className="pl-6 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Date</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Description</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Category</TableHead>
                <TableHead className="text-right pr-6 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((e, i) => (
                <TableRow key={i} className="border-border/60 hover:bg-secondary/40">
                  <TableCell className="pl-6 text-muted-foreground">{e.date}</TableCell>
                  <TableCell className="font-medium">{e.desc}</TableCell>
                  <TableCell><Badge variant="outline" className="rounded-full">{e.cat}</Badge></TableCell>
                  <TableCell className="text-right tabular-nums font-semibold pr-6">${e.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
