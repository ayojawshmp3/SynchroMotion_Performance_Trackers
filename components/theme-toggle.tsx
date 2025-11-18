"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark" | "system";

const THEME_SEQUENCE: ThemeMode[] = ["light", "dark", "system"];

const MODE_CONFIG: Record<
  ThemeMode,
  { label: string; Icon: typeof Sun }
> = {
  light: { label: "Light", Icon: Sun },
  dark: { label: "Dark", Icon: Moon },
  system: { label: "System", Icon: Monitor },
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme: ThemeMode =
    mounted && (theme === "light" || theme === "dark" || theme === "system")
      ? theme
      : "system";

  function cycleTheme() {
    const currentIndex = THEME_SEQUENCE.indexOf(currentTheme);
    const nextTheme =
      THEME_SEQUENCE[(currentIndex + 1) % THEME_SEQUENCE.length];
    setTheme(nextTheme);
  }

  const { Icon, label } = MODE_CONFIG[currentTheme];

  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      onClick={cycleTheme}
      className="gap-2"
      aria-label={`Switch theme (current: ${label})`}
    >
      <Icon className="size-4" aria-hidden />
      <span className="text-sm">{label} mode</span>
    </Button>
  );
}
