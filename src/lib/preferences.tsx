import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";
export type Mode = "beginner" | "advanced";
export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "KRW";

export const CURRENCIES: Record<CurrencyCode, { symbol: string; rate: number; locale: string; name: string }> = {
  USD: { symbol: "$", rate: 1, locale: "en-US", name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, locale: "de-DE", name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, locale: "en-GB", name: "Pound Sterling" },
  JPY: { symbol: "¥", rate: 156, locale: "ja-JP", name: "Japanese Yen" },
  KRW: { symbol: "₩", rate: 1380, locale: "ko-KR", name: "Korean Won" },
};

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "light" | "dark";
  toggleTheme: () => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  format: (usd: number, opts?: { decimals?: number }) => string;
  symbol: string;
};

const PreferencesContext = createContext<Ctx | null>(null);

const isBrowser = typeof window !== "undefined";

function readLS<T extends string>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return (v as T) || fallback;
  } catch {
    return fallback;
  }
}

function applyTheme(theme: Theme) {
  if (!isBrowser) return;
  const root = document.documentElement;
  const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && sysDark);
  root.classList.toggle("dark", dark);
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readLS<Theme>("mf:theme", "light"));
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => readLS<CurrencyCode>("mf:currency", "USD"));
  const [mode, setModeState] = useState<Mode>(() => readLS<Mode>("mf:mode", "beginner"));
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    applyTheme(theme);
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setResolvedTheme(theme === "dark" || (theme === "system" && sysDark) ? "dark" : "light");
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        applyTheme("system");
        setResolvedTheme(mq.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    if (isBrowser) localStorage.setItem("mf:theme", t);
  }, []);
  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    if (isBrowser) localStorage.setItem("mf:currency", c);
  }, []);
  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    if (isBrowser) localStorage.setItem("mf:mode", m);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const format = useCallback(
    (usd: number, opts?: { decimals?: number }) => {
      const c = CURRENCIES[currency];
      const value = usd * c.rate;
      const decimals = opts?.decimals ?? (currency === "JPY" || currency === "KRW" ? 0 : 2);
      try {
        return new Intl.NumberFormat(c.locale, {
          style: "currency",
          currency,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(value);
      } catch {
        return `${c.symbol}${value.toFixed(decimals)}`;
      }
    },
    [currency],
  );

  const value = useMemo<Ctx>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      toggleTheme,
      currency,
      setCurrency,
      mode,
      setMode,
      format,
      symbol: CURRENCIES[currency].symbol,
    }),
    [theme, setTheme, resolvedTheme, toggleTheme, currency, setCurrency, mode, setMode, format],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
