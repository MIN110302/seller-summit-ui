import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type Status = "Profitable" | "Low Margin" | "Losing Money";
const products: {
  name: string; price: number; cost: number; ship: number; fee: number; ad: number; status: Status;
}[] = [
  { name: "Wireless LED Lamp", price: 39.9, cost: 8.5, ship: 3.2, fee: 1.8, ad: 6.4, status: "Profitable" },
  { name: "Portable Blender", price: 49.0, cost: 14.2, ship: 4.5, fee: 2.1, ad: 22.6, status: "Low Margin" },
  { name: "Ergonomic Laptop Stand", price: 34.5, cost: 7.0, ship: 3.8, fee: 1.5, ad: 5.0, status: "Profitable" },
  { name: "Mini Thermal Printer", price: 59.0, cost: 22.0, ship: 5.0, fee: 2.6, ad: 31.0, status: "Losing Money" },
  { name: "Smart Water Bottle", price: 29.9, cost: 6.5, ship: 2.8, fee: 1.3, ad: 4.8, status: "Profitable" },
];

const statusStyle: Record<Status, string> = {
  Profitable: "bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/20",
  "Low Margin": "bg-[color:var(--warning)]/10 text-[color:var(--warning)] border-[color:var(--warning)]/20",
  "Losing Money": "bg-destructive/10 text-destructive border-destructive/20",
};

const fmt = (n: number) => `$${n.toFixed(2)}`;

export function ProductTable() {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">Product Profitability</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Per-product breakdown of your store</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Shipping</TableHead>
                <TableHead className="text-right">Fees</TableHead>
                <TableHead className="text-right">Ad Spend</TableHead>
                <TableHead className="text-right">Net Profit</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => {
                const profit = p.price - p.cost - p.ship - p.fee - p.ad;
                const margin = (profit / p.price) * 100;
                return (
                  <TableRow key={p.name}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-right">{fmt(p.price)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{fmt(p.cost)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{fmt(p.ship)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{fmt(p.fee)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{fmt(p.ad)}</TableCell>
                    <TableCell className={`text-right font-semibold ${profit < 0 ? "text-destructive" : "text-foreground"}`}>
                      {fmt(profit)}
                    </TableCell>
                    <TableCell className="text-right">{margin.toFixed(1)}%</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyle[p.status]}>
                        {p.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
