import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter, Search, MoreHorizontal, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useProducts, computeProfit, type Status } from "@/lib/products-store";
import { usePreferences } from "@/lib/preferences";
import { ModeToggle } from "@/components/dashboard/ModeToggle";
import { downloadCSV } from "@/lib/csv";
import { toast } from "sonner";
import { useMemo, useState } from "react";

const statusStyle: Record<Status, string> = {
  Profitable: "bg-[color:var(--success)]/10 text-[color:var(--success)] border border-[color:var(--success)]/25",
  "Low Margin": "bg-[color:var(--warning)]/10 text-[color:var(--warning)] border border-[color:var(--warning)]/25",
  "Losing Money": "bg-destructive/10 text-destructive border border-destructive/25",
};
const statusDot: Record<Status, string> = {
  Profitable: "bg-[color:var(--success)]",
  "Low Margin": "bg-[color:var(--warning)]",
  "Losing Money": "bg-destructive",
};

export function ProductTable() {
  const { products } = useProducts();
  const { format, mode } = usePreferences();
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6)
      .map((p) => ({ ...p, ...computeProfit(p) }));
  }, [products, query]);

  const handleExport = () => {
    downloadCSV(
      "marginflow-dashboard-products.csv",
      rows.map((p) => ({
        Product: p.name, SKU: p.sku, Price: p.price.toFixed(2),
        Cost: p.cost.toFixed(2), AdSpend: p.ad.toFixed(2),
        NetProfit: p.profit.toFixed(2), MarginPct: p.margin.toFixed(1), Status: p.status,
      })),
    );
    toast.success("Exported products.csv");
  };

  return (
    <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <CardTitle className="text-[17px] font-semibold tracking-tight">Product Profitability</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Per-product breakdown across your storefront</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search product…" className="pl-9 h-9 w-52 bg-secondary/60 border-transparent rounded-lg" />
          </div>
          <ModeToggle />
          <Button variant="outline" size="sm" className="gap-2 rounded-lg border-border/70" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-lg border-border/70">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/60">
                <TableHead className="pl-6 h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Product</TableHead>
                <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Revenue</TableHead>
                <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Cost</TableHead>
                {mode === "advanced" && (
                  <>
                    <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Shipping</TableHead>
                    <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Fees</TableHead>
                    <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Ad Spend</TableHead>
                    <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Refund%</TableHead>
                  </>
                )}
                <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Net Profit</TableHead>
                <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Margin</TableHead>
                <TableHead className="h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="pr-6 h-12 w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((p) => (
                <TableRow key={p.id} className={cn("border-border/60 hover:bg-secondary/40 transition-colors", p.status === "Losing Money" && "bg-destructive/[0.03]")}>
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-lg shrink-0">{p.emoji}</div>
                      <div className="min-w-0">
                        <div className="font-medium text-foreground truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">SKU · {p.sku}</div>
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
                  <TableCell className={cn("text-right tabular-nums font-semibold", p.profit < 0 ? "text-destructive" : "text-foreground")}>
                    {format(p.profit)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">{p.margin.toFixed(1)}%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("rounded-full font-medium gap-1.5 px-2.5 py-1", statusStyle[p.status])}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[p.status])} />
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/60 text-xs text-muted-foreground">
          <span>Showing {rows.length} of {products.length} products</span>
          <span className="capitalize">{mode} view</span>
        </div>
      </CardContent>
    </Card>
  );
}
