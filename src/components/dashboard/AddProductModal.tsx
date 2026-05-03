import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Sparkles } from "lucide-react";
import { useProducts, computeProfit } from "@/lib/products-store";
import { usePreferences } from "@/lib/preferences";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AddProductModal({ trigger, className }: { trigger?: React.ReactNode; className?: string }) {
  const { addProduct } = useProducts();
  const { format } = usePreferences();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    cost: 0,
    ship: 0,
    fee: 0,
    ad: 0,
    refund: 0,
    other: 0,
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: k === "name" ? v : parseFloat(v) || 0 }));
  };

  const preview = computeProfit({
    id: "x", name: "", emoji: "", sku: "", category: "",
    sales: 0, stock: 0, ...form,
  });

  const submit = () => {
    if (!form.name.trim()) {
      toast.error("Please enter a product name");
      return;
    }
    addProduct(form);
    toast.success("Product added", { description: `${form.name} · ${preview.margin.toFixed(1)}% margin` });
    setOpen(false);
    setForm({ name: "", price: 0, cost: 0, ship: 0, fee: 0, ad: 0, refund: 0, other: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className={cn("gap-2 rounded-lg shadow-sm", className)}>
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Add new product
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-2">
          <div className="space-y-1.5">
            <Label>Product name</Label>
            <Input value={form.name} onChange={update("name")} placeholder="e.g. Wireless Earbuds Pro" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { k: "price" as const, l: "Selling Price" },
              { k: "cost" as const, l: "Product Cost" },
              { k: "ship" as const, l: "Shipping Fee" },
              { k: "fee" as const, l: "Platform Fee" },
              { k: "ad" as const, l: "Ad Spend" },
              { k: "refund" as const, l: "Refund Rate %" },
              { k: "other" as const, l: "Other Costs" },
            ].map((f) => (
              <div key={f.k} className="space-y-1.5">
                <Label className="text-xs">{f.l}</Label>
                <Input type="number" value={form[f.k] || ""} onChange={update(f.k)} placeholder="0.00" />
              </div>
            ))}
          </div>
          <div
            className="rounded-xl p-4 text-primary-foreground"
            style={{
              background:
                preview.status === "Profitable"
                  ? "var(--gradient-primary)"
                  : preview.status === "Low Margin"
                  ? "linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.85 0.14 80))"
                  : "linear-gradient(135deg, oklch(0.65 0.22 25), oklch(0.7 0.2 20))",
            }}
          >
            <div className="text-[11px] uppercase tracking-wider opacity-90 font-semibold">Live preview · {preview.status}</div>
            <div className="flex items-end justify-between mt-1">
              <div className="text-2xl font-semibold">{format(preview.profit)}</div>
              <div className="text-sm opacity-90">{preview.margin.toFixed(1)}% margin</div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit}>Add product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
