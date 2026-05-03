import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Package, TrendingUp, TrendingDown, AlertTriangle, MoreHorizontal, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products — Marginflow" }] }),
  component: ProductsPage,
});

type Status = "Profitable" | "Low Margin" | "Losing Money";
type Product = {
  name: string; emoji: string; sku: string; category: string;
  price: number; cost: number; ship: number; fee: number; ad: number;
  status: Status; sales: number; stock: number;
};

const products: Product[] = [
  { name: "Wireless LED Lamp", emoji: "💡", sku: "MF-1042", category: "Home", price: 39.9, cost: 8.5, ship: 3.2, fee: 1.8, ad: 6.4, status: "Profitable", sales: 412, stock: 240 },
  { name: "Portable Blender", emoji: "🥤", sku: "MF-1108", category: "Kitchen", price: 49.0, cost: 14.2, ship: 4.5, fee: 2.1, ad: 22.6, status: "Low Margin", sales: 287, stock: 96 },
  { name: "Ergonomic Laptop Stand", emoji: "💻", sku: "MF-1233", category: "Office", price: 34.5, cost: 7.0, ship: 3.8, fee: 1.5, ad: 5.0, status: "Profitable", sales: 519, stock: 320 },
  { name: "Mini Thermal Printer", emoji: "🖨️", sku: "MF-1390", category: "Office", price: 59.0, cost: 22.0, ship: 5.0, fee: 2.6, ad: 31.0, status: "Losing Money", sales: 88, stock: 45 },
  { name: "Smart Water Bottle", emoji: "💧", sku: "MF-1455", category: "Fitness", price: 29.9, cost: 6.5, ship: 2.8, fee: 1.3, ad: 4.8, status: "Profitable", sales: 624, stock: 410 },
  { name: "Posture Corrector Belt", emoji: "🧍", sku: "MF-1521", category: "Fitness", price: 24.9, cost: 4.2, ship: 2.1, fee: 1.0, ad: 3.5, status: "Profitable", sales: 731, stock: 280 },
  { name: "RGB Gaming Mouse Pad", emoji: "🖱️", sku: "MF-1612", category: "Gaming", price: 22.0, cost: 7.8, ship: 3.0, fee: 1.1, ad: 8.6, status: "Low Margin", sales: 198, stock: 130 },
  { name: "Pet Hair Remover", emoji: "🐾", sku: "MF-1734", category: "Pets", price: 19.9, cost: 3.0, ship: 1.8, fee: 0.9, ad: 2.4, status: "Profitable", sales: 905, stock: 620 },
];

const statusStyle: Record<Status, string> = {
  Profitable: "bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/25",
  "Low Margin": "bg-[color:var(--warning)]/10 text-[color:var(--warning)] border-[color:var(--warning)]/25",
  "Losing Money": "bg-destructive/10 text-destructive border-destructive/25",
};
const dot: Record<Status, string> = {
  Profitable: "bg-[color:var(--success)]",
  "Low Margin": "bg-[color:var(--warning)]",
  "Losing Money": "bg-destructive",
};
const fmt = (n: number) => `$${n.toFixed(2)}`;

function ProductsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = products.filter(p =>
    (statusFilter === "all" || p.status === statusFilter) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalProfit = products.reduce((acc, p) => acc + (p.price - p.cost - p.ship - p.fee - p.ad) * p.sales, 0);
  const profitable = products.filter(p => p.status === "Profitable").length;
  const losing = products.filter(p => p.status === "Losing Money").length;

  const stats = [
    { label: "Total Products", value: products.length.toString(), icon: Package, color: "text-primary", bg: "bg-primary/10" },
    { label: "Profitable", value: profitable.toString(), icon: TrendingUp, color: "text-[color:var(--success)]", bg: "bg-[color:var(--success)]/10" },
    { label: "Losing Money", value: losing.toString(), icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Est. Monthly Profit", value: `$${totalProfit.toFixed(0)}`, icon: AlertTriangle, color: "text-[color:var(--accent)]", bg: "bg-[color:var(--accent)]/10" },
  ];

  return (
    <DashboardLayout title="Products" subtitle="Manage your store catalog and product profitability">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center", s.bg)}>
                <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                <div className="text-xl font-semibold tracking-tight mt-0.5">{s.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <CardTitle className="text-[17px] font-semibold tracking-tight">All Products</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} products in your catalog</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search product…" className="pl-9 h-9 w-52 bg-secondary/60 border-transparent rounded-lg" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-40 rounded-lg border-border/70">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Profitable">Profitable</SelectItem>
                <SelectItem value="Low Margin">Low Margin</SelectItem>
                <SelectItem value="Losing Money">Losing Money</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2 rounded-lg border-border/70">
              <Filter className="h-4 w-4" /> More
            </Button>
            <Button size="sm" className="gap-2 rounded-lg shadow-sm">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/60">
                  <TableHead className="pl-6 h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Product</TableHead>
                  <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Price</TableHead>
                  <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Cost</TableHead>
                  <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Ad Spend</TableHead>
                  <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Net Profit</TableHead>
                  <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Margin</TableHead>
                  <TableHead className="h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Status</TableHead>
                  <TableHead className="pr-6 w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => {
                  const profit = p.price - p.cost - p.ship - p.fee - p.ad;
                  const margin = (profit / p.price) * 100;
                  return (
                    <TableRow
                      key={p.sku}
                      className="border-border/60 hover:bg-secondary/40 transition-colors cursor-pointer"
                      onClick={() => { setSelected(p); setOpen(true); }}
                    >
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-lg shrink-0">{p.emoji}</div>
                          <div className="min-w-0">
                            <div className="font-medium text-foreground truncate">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.category} · SKU {p.sku}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{fmt(p.price)}</TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">{fmt(p.cost)}</TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">{fmt(p.ad)}</TableCell>
                      <TableCell className={cn("text-right tabular-nums font-semibold", profit < 0 ? "text-destructive" : "text-foreground")}>{fmt(profit)}</TableCell>
                      <TableCell className="text-right tabular-nums font-medium">{margin.toFixed(1)}%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("rounded-full font-medium gap-1.5 px-2.5 py-1", statusStyle[p.status])}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", dot[p.status])} />
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-6">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl">{selected.emoji}</div>
                  <div>
                    <SheetTitle>{selected.name}</SheetTitle>
                    <SheetDescription>{selected.category} · SKU {selected.sku}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: "Selling Price", v: fmt(selected.price) },
                    { l: "Product Cost", v: fmt(selected.cost) },
                    { l: "Shipping", v: fmt(selected.ship) },
                    { l: "Platform Fees", v: fmt(selected.fee) },
                    { l: "Ad Spend", v: fmt(selected.ad) },
                    { l: "Units Sold", v: selected.sales.toString() },
                  ].map((m) => (
                    <div key={m.l} className="rounded-xl border border-border/60 bg-secondary/40 p-3">
                      <div className="text-xs text-muted-foreground">{m.l}</div>
                      <div className="text-sm font-semibold mt-1">{m.v}</div>
                    </div>
                  ))}
                </div>
                {(() => {
                  const profit = selected.price - selected.cost - selected.ship - selected.fee - selected.ad;
                  const margin = (profit / selected.price) * 100;
                  return (
                    <div className="rounded-2xl border border-border/60 p-5" style={{ background: "var(--gradient-primary)" }}>
                      <div className="text-xs text-primary-foreground/80 font-medium">Net Profit per Unit</div>
                      <div className="text-3xl font-semibold text-primary-foreground tracking-tight mt-1">{fmt(profit)}</div>
                      <div className="text-sm text-primary-foreground/80 mt-1">{margin.toFixed(1)}% margin · Stock: {selected.stock}</div>
                    </div>
                  );
                })()}
                <div className="flex gap-2">
                  <Button className="flex-1">Edit product</Button>
                  <Button variant="outline" className="gap-2"><ExternalLink className="h-4 w-4" /> View</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
