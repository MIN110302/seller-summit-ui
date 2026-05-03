import { Bell, Plus, Search, ChevronDown, CalendarDays, Sun, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddProductModal } from "@/components/dashboard/AddProductModal";
import { CURRENCIES, usePreferences, type CurrencyCode } from "@/lib/preferences";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, title: "Low margin warning", desc: "3 products fell below 15% margin today.", tone: "warning", time: "12m" },
  { id: 2, title: "High ad spend alert", desc: "Meta Ads up 24% week-over-week.", tone: "destructive", time: "1h" },
  { id: 3, title: "Integration sync completed", desc: "Shopify orders synced — 412 new events.", tone: "success", time: "3h" },
  { id: 4, title: "New product added", desc: "Smart Water Bottle was added to your catalog.", tone: "primary", time: "1d" },
];

const toneClass: Record<string, string> = {
  warning: "bg-[color:var(--warning)]/15 text-[color:var(--warning)]",
  destructive: "bg-destructive/10 text-destructive",
  success: "bg-[color:var(--success)]/15 text-[color:var(--success)]",
  primary: "bg-primary/10 text-primary",
};

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const { resolvedTheme, toggleTheme, currency, setCurrency } = usePreferences();

  const handleThemeToggle = () => {
    toggleTheme();
    toast(`Switched to ${resolvedTheme === "dark" ? "light" : "dark"} mode`);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-card/95">
      <div className="flex h-16 items-center gap-4 px-4 md:px-8">
        <div className="flex flex-col min-w-0">
          <h1 className="text-[20px] font-semibold tracking-tight text-foreground leading-none truncate">{title}</h1>
          <span className="text-xs text-muted-foreground mt-1 truncate">{subtitle ?? "Welcome back, Alex — here's your store today."}</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 md:gap-2">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, orders…"
              className="pl-9 w-64 bg-secondary/60 border-transparent rounded-lg focus-visible:bg-card focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button variant="outline" size="sm" className="hidden xl:inline-flex gap-2 rounded-lg border-border/70">
            <CalendarDays className="h-4 w-4" />
            Last 30 days
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-lg gap-1.5 px-2.5 font-medium">
                <span className="text-base leading-none">{CURRENCIES[currency].symbol}</span>
                <span className="hidden md:inline text-xs">{currency}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Display currency</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={currency}
                onValueChange={(v) => {
                  setCurrency(v as CurrencyCode);
                  toast.success(`Currency set to ${v}`);
                }}
              >
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                  <DropdownMenuRadioItem key={c} value={c}>
                    <span className="font-medium">{CURRENCIES[c].symbol} {c}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{CURRENCIES[c].name}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="rounded-lg" onClick={handleThemeToggle} aria-label="Toggle theme">
            {resolvedTheme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--accent)] ring-2 ring-card" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                <div>
                  <div className="text-sm font-semibold">Notifications</div>
                  <div className="text-xs text-muted-foreground">{notifications.length} new alerts</div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => toast("All caught up")}>
                  <Check className="h-3.5 w-3.5" /> Mark read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto py-1">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    className="w-full text-left flex gap-3 px-4 py-3 hover:bg-secondary/60 transition-colors"
                  >
                    <span className={cn("h-8 w-8 rounded-lg shrink-0 flex items-center justify-center", toneClass[n.tone])}>
                      <Bell className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{n.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{n.desc}</div>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                  </button>
                ))}
              </div>
              <div className="px-3 py-2 border-t border-border/60">
                <Button variant="ghost" size="sm" className="w-full text-xs justify-center">View all notifications</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <AddProductModal
            trigger={
              <Button className="hidden md:inline-flex gap-2 rounded-lg shadow-sm">
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            }
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-secondary/70 transition-colors">
                <Avatar className="h-8 w-8 ring-2 ring-border/70">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">AK</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Alex Kim</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
