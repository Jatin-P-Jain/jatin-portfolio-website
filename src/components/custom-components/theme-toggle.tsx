"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="mt-4"
    >
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </Button>
  );
}
