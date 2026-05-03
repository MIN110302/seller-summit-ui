import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = "Profitable" | "Low Margin" | "Losing Money";
const products: {
  name: string; emoji: string; sku: string; price: number; cost: number; ship: number; fee: number; ad: number; status: Status;
}[] = [
  { name: "Wireless LED Lamp", emoji: "💡", sku: "MF-1042", price: 39.9, cost: 8.5, ship: 3.2, fee: 1.8, ad: 6.4, status: "Profitable" },
  { name: "Portable Blender", emoji: "🥤", sku: "MF-1108", price: 49.0, cost: 14.2, ship: 4.5, fee: 2.1, ad: 22.6, status: "Low Margin" },
  { name: "Ergonomic Laptop Stand", emoji: "💻", sku: "MF-1233", price: 34.5, cost: 7.0, ship: 3.8, fee: 1.5, ad: 5.0, status: "Profitable" },
  { name: "Mini Thermal Printer", emoji: "🖨️", sku: "MF-1390", price: 59.0, cost: 22.0, ship: 5.0, fee: 2.6, ad: 31.0, status: "Losing Money" },
  { name: "Smart Water Bottle", emoji: "💧", sku: "MF-1455", price: 29.9, cost: 6.5, ship: 2.8, fee: 1.3, ad: 4.8, status: "Profitable" },
];

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

const fmt = (n: number) => `$${n.toFixed(2)}`;

type Mode = "beginner" | "advanced";

export function ProductTable() {
  const [mode, setMode] = useState<Mode>("beginner");

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
            <Input placeholder="Search product…" className="pl-9 h-9 w-52 bg-secondary/60 border-transparent rounded-lg" />
          </div>
          <div className="inline-flex items-center rounded-lg bg-secondary/70 p-1 text-xs font-medium">
            <button
              onClick={() => setMode("beginner")}
              className={cn(
                "px-3 py-1.5 rounded-md transition-all",
                mode === "beginner" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Beginner
            </button>
            <button
              onClick={() => setMode("advanced")}
              className={cn(
                "px-3 py-1.5 rounded-md transition-all",
                mode === "advanced" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Advanced
            </button>
          </div>
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
                {mode === "advanced" && (
                  <>
                    <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Cost</TableHead>
                    <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Shipping</TableHead>
                    <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Fees</TableHead>
                    <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Ad Spend</TableHead>
                  </>
                )}
                <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Net Profit</TableHead>
                <TableHead className="text-right h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Margin</TableHead>
                <TableHead className="h-12 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="pr-6 h-12 w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => {
                const profit = p.price - p.cost - p.ship - p.fee - p.ad;
                const margin = (profit / p.price) * 100;
                return (
                  <TableRow key={p.name} className="border-border/60 hover:bg-secondary/40 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-lg shrink-0">
                          {p.emoji}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-foreground truncate">{p.name}</div>
                          <div className="text-xs text-muted-foreground">SKU · {p.sku}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{fmt(p.price)}</TableCell>
                    {mode === "advanced" && (
                      <>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{fmt(p.cost)}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{fmt(p.ship)}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{fmt(p.fee)}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{fmt(p.ad)}</TableCell>
                      </>
                    )}
                    <TableCell className={cn("text-right tabular-nums font-semibold", profit < 0 ? "text-destructive" : "text-foreground")}>
                      {fmt(profit)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">{margin.toFixed(1)}%</TableCell>
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
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/60 text-xs text-muted-foreground">
          <span>Showing {products.length} of {products.length} products</span>
          <span>{mode === "beginner" ? "Simplified view" : "Detailed cost breakdown"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
