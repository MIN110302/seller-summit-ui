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
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: Package },
  { title: "Profit Calculator", url: "/calculator", icon: Calculator },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Expenses", url: "/expenses", icon: Receipt },
  { title: "Integrations", url: "/integrations", icon: Plug },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Profile", url: "/profile", icon: User },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-border bg-card z-30">
      <div className="flex items-center gap-2 px-6 h-16 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold tracking-tight text-foreground">Marginflow</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">Profit Intelligence</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const active = path === item.url;
          return (
            <a
              key={item.url}
              href={item.url}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </a>
          );
        })}
      </nav>
      <div className="m-3 rounded-xl border border-border bg-gradient-to-br from-primary to-primary/80 p-4 text-primary-foreground">
        <div className="text-xs font-medium opacity-80">Pro Plan</div>
        <div className="mt-1 text-sm font-semibold">Unlock AI Insights</div>
        <button className="mt-3 w-full rounded-md bg-white/15 hover:bg-white/25 transition-colors py-1.5 text-xs font-medium">
          Upgrade
        </button>
      </div>
    </aside>
  );
}
