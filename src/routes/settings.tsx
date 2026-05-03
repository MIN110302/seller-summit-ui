import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Building2, Bell, Palette, Save, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Marginflow" }] }),
  component: SettingsPage,
});

function Section({ icon: Icon, title, desc, children }: { icon: any; title: string; desc: string; children: React.ReactNode }) {
  return (
    <Card className="border-border/60 rounded-2xl shadow-[var(--shadow-card)]">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-[15px] font-semibold tracking-tight">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">{children}</CardContent>
    </Card>
  );
}

function SettingsPage() {
  const [threshold, setThreshold] = useState([15]);
  const [theme, setTheme] = useState("system");
  const [saved, setSaved] = useState(false);

  return (
    <DashboardLayout title="Settings" subtitle="Configure your workspace and preferences">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Section icon={Building2} title="Business" desc="Information shown on reports and invoices">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Business name</Label><Input defaultValue="Marginflow Co." className="h-10 rounded-lg" /></div>
            <div className="space-y-1.5"><Label>Store URL</Label><Input defaultValue="marginflow.shop" className="h-10 rounded-lg" /></div>
            <div className="space-y-1.5"><Label>Default currency</Label>
              <Select defaultValue="USD"><SelectTrigger className="h-10 rounded-lg"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD — US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR — Euro</SelectItem>
                  <SelectItem value="GBP">GBP — Pound Sterling</SelectItem>
                  <SelectItem value="CAD">CAD — Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD — Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Timezone</Label>
              <Select defaultValue="UTC-5"><SelectTrigger className="h-10 rounded-lg"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific (UTC-8)</SelectItem>
                  <SelectItem value="UTC-5">Eastern (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">UTC</SelectItem>
                  <SelectItem value="UTC+1">CET (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        <Section icon={AlertTriangle} title="Margin alerts" desc="Get warned when products fall below threshold">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Margin warning threshold</Label>
              <span className="text-sm font-semibold text-primary">{threshold[0]}%</span>
            </div>
            <Slider value={threshold} onValueChange={setThreshold} min={5} max={50} step={1} />
            <p className="text-xs text-muted-foreground">Products below this margin will be flagged in red.</p>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/40 p-4">
            <div><div className="text-sm font-medium">Auto-pause losing products</div>
              <div className="text-xs text-muted-foreground">Suggest pausing ads when margin drops below 0%.</div></div>
            <Switch defaultChecked />
          </div>
        </Section>

        <Section icon={Bell} title="Notifications" desc="Choose how Marginflow keeps you informed">
          {[
            { l: "Daily profit summary", d: "Email digest each morning at 8:00 AM.", on: true },
            { l: "Margin drop alerts", d: "Push when a product falls below threshold.", on: true },
            { l: "Ad spend warnings", d: "Notify when ad spend rises 20% week-over-week.", on: false },
            { l: "Weekly performance report", d: "Comprehensive weekly summary every Monday.", on: true },
          ].map(n => (
            <div key={n.l} className="flex items-center justify-between rounded-xl border border-border/60 p-4">
              <div><div className="text-sm font-medium">{n.l}</div>
                <div className="text-xs text-muted-foreground">{n.d}</div></div>
              <Switch defaultChecked={n.on} />
            </div>
          ))}
        </Section>

        <Section icon={Palette} title="Appearance" desc="Customize how Marginflow looks">
          <div className="space-y-1.5"><Label>Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              {["light", "dark", "system"].map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={cn(
                    "rounded-xl border-2 p-3 text-sm font-medium capitalize transition-all",
                    theme === t ? "border-primary bg-primary/5 text-primary" : "border-border/60 hover:bg-secondary/40"
                  )}
                >{t}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border/60 p-4">
            <div><div className="text-sm font-medium">Compact mode</div>
              <div className="text-xs text-muted-foreground">Tighter spacing for denser dashboards.</div></div>
            <Switch />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border/60 p-4">
            <div><div className="text-sm font-medium">Show currency symbols</div>
              <div className="text-xs text-muted-foreground">Display $ in tables and KPI cards.</div></div>
            <Switch defaultChecked />
          </div>
        </Section>
      </div>

      <div className="flex items-center justify-end gap-3 sticky bottom-4 bg-card/80 backdrop-blur-xl rounded-2xl border border-border/60 p-3 shadow-[var(--shadow-card)]">
        {saved && <span className="text-sm text-[color:var(--success)] font-medium">✓ Settings saved</span>}
        <Button variant="outline" className="rounded-lg">Cancel</Button>
        <Button className="rounded-lg gap-2" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          <Save className="h-4 w-4" /> Save changes
        </Button>
      </div>
    </DashboardLayout>
  );
}
