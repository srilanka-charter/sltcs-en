import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Vehicles from "./pages/Vehicles";
import FAQ from "./pages/FAQ";
import Thanks from "./pages/Thanks";
import LowPriceRisk from "./pages/LowPriceRisk";
import Voice from "./pages/Voice";

const GITHUB_PAGES_BASE = "/sltcs-en";

function getRouterBase() {
  if (typeof window === "undefined") return "";
  const { pathname } = window.location;
  return pathname === GITHUB_PAGES_BASE || pathname.startsWith(`${GITHUB_PAGES_BASE}/`) ? GITHUB_PAGES_BASE : "";
}

function useGithubPagesInternalLinks(base: string) {
  useEffect(() => {
    if (!base || typeof document === "undefined") return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith(`${base}/`)) return;

      event.preventDefault();
      const nextUrl = href === "/" ? `${base}/` : `${base}${href}`;
      window.history.pushState(null, "", nextUrl);
      window.dispatchEvent(new PopStateEvent("popstate"));

      const hash = href.split("#")[1];
      if (hash) {
        window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [base]);
}

function AppRoutes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/thanks"} component={Thanks} />
      <Route path={"/price"} component={Pricing} />
      <Route path={"/vehicles"} component={Vehicles} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/low-price-risk"} component={LowPriceRisk} />
      <Route path={"/voice"} component={Voice} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const routerBase = getRouterBase();
  useGithubPagesInternalLinks(routerBase);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={routerBase}>
            <AppRoutes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
