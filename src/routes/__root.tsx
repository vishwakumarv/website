import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">error_404</p>
        <h1 className="mt-3 font-display text-5xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The route you requested doesn't exist or has moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Return home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-critical">runtime_error</p>
        <h1 className="mt-3 font-display text-2xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-border px-4 py-2 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vishwa Kumar — SOC Analyst & DFIR Portfolio" },
      { name: "description", content: "Portfolio of Vishwa Kumar — aspiring SOC Analyst, DFIR enthusiast, and security operations engineer. Detection engineering, malware triage, and Linux-focused security research." },
      { name: "author", content: "Vishwa Kumar Venkateswaran" },
      { name: "theme-color", content: "#0d1422" },
      { property: "og:title", content: "Vishwa Kumar — SOC Analyst & DFIR Portfolio" },
      { property: "og:description", content: "Recruiter-first portfolio for SOC, DFIR, and Security Operations roles." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "vishwa.sec" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
  { rel: "stylesheet", href: appCss },
  { rel: "icon", type: "image/png", href: "/favicon.png" },  // ← add this line
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Vishwa Kumar Venkateswaran",
          jobTitle: "SOC Analyst · DFIR Enthusiast",
          url: "/",
          sameAs: [
            "https://github.com/vishwakumarv",
            "https://www.linkedin.com/in/vishwakumarv",
            "https://bugcrowd.com/h/vishwakumarv",
            "https://hackerone.com/vishwakumarv_",
            "https://tryhackme.com/p/vishwakumarv",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
