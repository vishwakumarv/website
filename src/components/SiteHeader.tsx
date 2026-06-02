import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/resume", label: "Resume" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass border-b border-border/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="group flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-md border border-border bg-surface-elevated text-primary">
              <Shield className="h-3.5 w-3.5" />
            </span>
            <span>vishwa<span className="text-primary">.</span>sec</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive(item.to)
                    ? "bg-surface-elevated text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="/Vishwa-Kumar-Resume.pdf"
              download
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Download Resume
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border/60 md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm ${
                    isActive(item.to)
                      ? "bg-surface-elevated text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/Vishwa-Kumar-Resume.pdf"
                download
                className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
              >
                Download Resume
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
