import { useState } from "react";

export type Theme = "light" | "dark";

// The inline script in index.html sets the initial `dark` class before React
// renders (to avoid a flash of the wrong theme), so the DOM is the source of truth.
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be unavailable (e.g. blocked site data); the theme still applies for this page view.
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    persistTheme(nextTheme);
    setTheme(nextTheme);
  };

  return { theme, toggleTheme };
}
