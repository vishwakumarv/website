import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { posts, categories } from "@/data/portfolio";
import { Search, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Malware, DFIR & Detection Notes" },
      { name: "description", content: "Technical writeups on malware analysis, DFIR, detection engineering, Linux research, reverse engineering, and security tooling." },
      { property: "og:title", content: "Blog — Vishwa Kumar" },
      { property: "og:description", content: "Security writeups and notes." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCat = cat === "All" || p.category === cat;
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [query, cat]);

  const featured = posts.filter((p) => p.featured);

  return (
    <Section
      eyebrow="blog"
      title="Technical writeups & notes"
      description="Short, structured notes on malware analysis, DFIR, detection engineering, Linux, reverse engineering, and the small tools that make analyst work faster."
    >
      {/* Featured */}
      {featured.length > 0 && (
        <div className="mb-12 grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group glass flex flex-col rounded-xl p-6 transition hover:border-primary/50"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary">
                featured · {p.category}
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <PostMeta date={p.date} minutes={p.readingMinutes} />
            </Link>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, tags…"
            className="w-full rounded-md border border-border bg-surface/60 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/60"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                cat === c
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-border bg-surface/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group glass flex flex-col gap-2 rounded-xl p-5 transition hover:border-primary/50 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-primary">{p.category}</p>
              <h3 className="mt-1.5 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded border border-border bg-surface-elevated/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 md:flex-col md:items-end">
              <PostMeta date={p.date} minutes={p.readingMinutes} />
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center font-mono text-sm text-muted-foreground">no posts match.</p>
        )}
      </div>
    </Section>
  );
}

function PostMeta({ date, minutes }: { date: string; minutes: number }) {
  return (
    <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
      <span>{new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{minutes} min</span>
    </div>
  );
}
