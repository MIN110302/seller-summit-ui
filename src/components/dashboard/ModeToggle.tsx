import { usePreferences, type Mode } from "@/lib/preferences";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { mode, setMode } = usePreferences();
  return (
    <div className={cn("inline-flex items-center rounded-lg bg-secondary/70 p-1 text-xs font-medium", className)}>
      {(["beginner", "advanced"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={cn(
            "px-3 py-1.5 rounded-md transition-all capitalize",
            mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
