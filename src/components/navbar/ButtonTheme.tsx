"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ButtonTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      aria-label={`Change to ${mounted && theme} theme.`}
    >
      {mounted && (
        <>
          {theme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          )}
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
