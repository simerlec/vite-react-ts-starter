import { useState } from "react";
import { MoonIconComponent } from "@/icons/Moon";
import { SunIconComponent } from "@/icons/Sun";
import { CountButtonComponent } from "@/components/CountButton";
import { useTheme } from "@/hooks/useTheme";
import logo from "@/logo.svg";

function AppComponent() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-white text-center dark:bg-gray-700">
      <nav className="flex h-16 items-center justify-end px-4">
        <button
          type="button"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className="flex rounded-sm p-2 text-black hover:bg-gray-500 hover:text-yellow-400 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-white dark:hover:bg-gray-500 dark:hover:text-yellow-400"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <SunIconComponent /> : <MoonIconComponent />}
        </button>
      </nav>
      <header className="flex grow flex-col items-center justify-center text-2xl text-gray-700 dark:text-white">
        <img src={logo} className="h-72 animate-spin-slow" alt="logo" />
        <p>Hello Vite + React!</p>
        <p className="my-8">
          <CountButtonComponent
            count={count}
            onClick={() => setCount((previousCount) => previousCount + 1)}
          />
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="text-blue-400"
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="text-blue-400"
            href="https://vite.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default AppComponent;
