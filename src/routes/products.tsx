import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package, TrendingUp, TrendingDown, AlertTriangle, MoreHorizontal, ExternalLink, Download, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProducts, computeProfit, type Product, type Status } from "@/lib/products-store";
import { usePreferences } from "@/lib/preferences";
import { ModeToggle } from "@/components/dashboard/ModeToggle";
import { AddProductModal } from "@/components/dashboard/AddProductModal";
import { downloadCSV } from "@/lib/csv";
import { toast } from "sonner";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products — Marginflow" }] }),
  component: ProductsPage,
});

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

type SortKey = "revenue" | "profit" | "margin" | "ad";

function ProductsPage() {
  const { products } = useProducts();
  const { format, mode } = usePreferences();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const enriched = useMemo(
    () =>
      products.map((p) => {
        const c = computeProfit(p);
        return { ...p, ...c, revenue: p.price * Math.max(p.sales, 1) };
      }),
    [products],
  );

  const filtered = useMemo(() => {
    const f = enriched.filter(
      (p) =>
        (statusFilter === "all" || p.status === statusFilter) &&
        p.name.toLowerCase().includes(query.toLowerCase()),
    );
    f.sort((a, b) => {
      switch (sortKey) {
        case "revenue": return b.revenue - a.revenue;
        case "profit": return b.profit - a.profit;
        case "margin": return b.margin - a.margin;
        case "ad": return b.ad - a.ad;
      }
    });
    return f;
  }, [enriched, query, statusFilter, sortKey]);

  const profitable = enriched.filter((p) => p.status === "Profitable").length;
  const losing = enriched.filter((p) => p.status === "Losing Money").length;
  const totalProfit = enriched.reduce((acc, p) => acc + p.profit * p.sales, 0);

  const stats = [
    { label: "Total Products", value: products.length.toString(), icon: Package, color: "text-primary", bg: "bg-primary/10" },
    { label: "Profitable", value: profitable.toString(), icon: TrendingUp, color: "text-[color:var(--success)]", bg: "bg-[color:var(--success)]/10" },
    { label: "Losing Money", value: losing.toString(), icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Est. Monthly Profit", value: format(totalProfit, { decimals: 0 }), icon: AlertTriangle, color: "text-[color:var(--accent)]", bg: "bg-[color:var(--accent)]/10" },
  ];

  const handleExport = () => {
    downloadCSV(
      "marginflow-products.csv",
      filtered.map((p) => ({
        Product: p.name,
        SKU: p.sku,
        Category: p.category,
        Price: p.price.toFixed(2),
        Cost: p.cost.toFixed(2),
        Shipping: p.ship.toFixed(2),
        Fee: p.fee.toFixed(2),
        AdSpend: p.ad.toFixed(2),
        NetProfit: p.profit.toFixed(2),
        MarginPct: p.margin.toFixed(1),
        Status: p.status,
      })),
    );
    toast.success("Exported products.csv", { description: `${filtered.length} rows downloaded` });
  };

  return (
    <DashboardLayout title="Products" subtitle="Manage your store catalog and product profitability">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
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

      {losing > 0 && (
        <Card className="border-destructive/30 bg-destructive/5 rounded-2xl">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-destructive">{losing} product{losing > 1 ? "s" : ""} losing money</div>
              <div className="text-xs text-muted-foreground mt-0.5">Review pricing or pause ads on items with margin below 10%.</div>
            </div>
          </CardContent>
        </Card>
      )}

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
              <SelectTrigger className="h-9 w-40 rounded-lg border-border/70"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Profitable">Profitable</SelectItem>
                <SelectItem value="Low Margin">Low Margin</SelectItem>
                <SelectItem value="Losing Money">Losing Money</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
              <SelectTrigger className="h-9 w-44 rounded-lg border-border/70">
                <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Sort: Revenue</SelectItem>
                <SelectItem value="profit">Sort: Net Profit</SelectItem>
                <SelectItem value="margin">Sort: Margin</SelectItem>
                <SelectItem value="ad">Sort: Ad Spend</SelectItem>
              </SelectContent>
            </Select>
            <ModeToggle />
            <Button variant="outline" size="sm" className="gap-2 rounded-lg border-border/70" onClick={handleExport}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <AddProductModal />
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
                  {mode === "advanced" && (
                    <>
                      <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Shipping</TableHead>
                      <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Fees</TableHead>
                      <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Ad</TableHead>
                      <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Refund%</TableHead>
                    </>
                  )}
                  <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Net Profit</TableHead>
                  <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Margin</TableHead>
                  <TableHead className="h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Status</TableHead>
                  <TableHead className="pr-6 w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow
                    key={p.id}
                    className={cn(
                      "border-border/60 hover:bg-secondary/40 transition-colors cursor-pointer",
                      p.status === "Losing Money" && "bg-destructive/[0.03]",
                    )}
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
                    <TableCell className="text-right tabular-nums">{format(p.price)}</TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">{format(p.cost)}</TableCell>
                    {mode === "advanced" && (
                      <>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{format(p.ship)}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{format(p.fee)}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{format(p.ad)}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{p.refund}%</TableCell>
                      </>
                    )}
                    <TableCell className={cn("text-right tabular-nums font-semibold", p.profit < 0 ? "text-destructive" : "text-foreground")}>{format(p.profit)}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">{p.margin.toFixed(1)}%</TableCell>
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
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={mode === "advanced" ? 11 : 7} className="text-center py-12 text-muted-foreground">
                      No products match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (() => {
            const c = computeProfit(selected);
            return (
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
                      { l: "Selling Price", v: format(selected.price) },
                      { l: "Product Cost", v: format(selected.cost) },
                      { l: "Shipping", v: format(selected.ship) },
                      { l: "Platform Fees", v: format(selected.fee) },
                      { l: "Ad Spend", v: format(selected.ad) },
                      { l: "Units Sold", v: selected.sales.toString() },
                    ].map((m) => (
                      <div key={m.l} className="rounded-xl border border-border/60 bg-secondary/40 p-3">
                        <div className="text-xs text-muted-foreground">{m.l}</div>
                        <div className="text-sm font-semibold mt-1">{m.v}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="rounded-2xl border border-border/60 p-5"
                    style={{
                      background:
                        c.status === "Profitable"
                          ? "var(--gradient-primary)"
                          : c.status === "Low Margin"
                          ? "linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.85 0.14 80))"
                          : "linear-gradient(135deg, oklch(0.65 0.22 25), oklch(0.7 0.2 20))",
                    }}
                  >
                    <div className="text-xs text-primary-foreground/80 font-medium">Net Profit per Unit</div>
                    <div className="text-3xl font-semibold text-primary-foreground tracking-tight mt-1">{format(c.profit)}</div>
                    <div className="text-sm text-primary-foreground/80 mt-1">{c.margin.toFixed(1)}% margin · Stock: {selected.stock}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Edit product</Button>
                    <Button variant="outline" className="gap-2"><ExternalLink className="h-4 w-4" /> View</Button>
                  </div>
                </div>
              </>
            );
          })()}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
