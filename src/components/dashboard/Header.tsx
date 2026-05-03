import { Bell, Plus, Search, ChevronDown, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-card/95">
      <div className="flex h-16 items-center gap-4 px-4 md:px-8">
        <div className="flex flex-col min-w-0">
          <h1 className="text-[20px] font-semibold tracking-tight text-foreground leading-none truncate">{title}</h1>
          <span className="text-xs text-muted-foreground mt-1 truncate">{subtitle ?? "Welcome back, Alex — here's your store today."}</span>
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-2.5">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, orders…"
              className="pl-9 w-72 bg-secondary/60 border-transparent rounded-lg focus-visible:bg-card focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button variant="outline" size="sm" className="hidden md:inline-flex gap-2 rounded-lg border-border/70">
            <CalendarDays className="h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-lg">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--accent)] ring-2 ring-card" />
          </Button>
          <Button className="gap-2 rounded-lg shadow-sm">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-secondary/70 transition-colors">
                <Avatar className="h-8 w-8 ring-2 ring-border/70">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">AK</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
