import { useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Calculator,
  BarChart3,
  Receipt,
  Plug,
  Settings,
  User,
  TrendingUp,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: Package },
  { title: "Profit Calculator", url: "/calculator", icon: Calculator },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Expenses", url: "/expenses", icon: Receipt },
];

const accountItems = [
  { title: "Integrations", url: "/integrations", icon: Plug },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Profile", url: "/profile", icon: User },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  const renderItem = (item: { title: string; url: string; icon: typeof LayoutDashboard }) => {
    const active = path === item.url;
    return (
      <a
        key={item.url}
        href={item.url}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
          active
            ? "bg-primary/8 text-primary"
            : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        )}
      >
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-primary" />
        )}
        <item.icon className={cn("h-[18px] w-[18px] transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
        <span>{item.title}</span>
      </a>
    );
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-border/70 bg-card z-30">
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-border/70">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-primary)" }}>
          <TrendingUp className="h-[18px] w-[18px]" />
        </div>
        <div className="leading-tight">
          <div className="font-semibold tracking-tight text-foreground text-[15px]">Marginflow</div>
          <div className="text-[11px] text-muted-foreground">Profit Intelligence</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
          Workspace
        </div>
        <div className="space-y-0.5">{mainItems.map(renderItem)}</div>

        <div className="px-3 pt-6 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
          Account
        </div>
        <div className="space-y-0.5">{accountItems.map(renderItem)}</div>
      </nav>

      <div className="px-3 pb-2">
        <a href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/70 hover:text-foreground transition-colors">
          <HelpCircle className="h-4 w-4" />
          Help & Support
        </a>
      </div>

      <div
        className="m-3 rounded-2xl p-4 text-primary-foreground relative overflow-hidden"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
      >
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-1.5 text-[11px] font-medium opacity-90">
            <Sparkles className="h-3 w-3" /> PRO PLAN
          </div>
          <div className="mt-1.5 text-[15px] font-semibold leading-snug">Unlock AI Insights</div>
          <div className="mt-1 text-xs opacity-80 leading-snug">Smarter recommendations for your store.</div>
          <button className="mt-3 w-full rounded-lg bg-white text-primary hover:bg-white/90 transition-colors py-2 text-xs font-semibold">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  );
}
