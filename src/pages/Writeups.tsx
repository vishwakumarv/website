import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { posts, categories } from "@/data/portfolio";
import { Search, Clock, ArrowRight } from "lucide-react";

const categorySlugs = {
  All: "all",
  CTF: "ctf",
  HackTheBox: "htb",
  "Security Research": "security-research",
} as const;

const slugToCategory = {
  all: "All",
  ctf: "CTF",
  htb: "HackTheBox",
  hackthebox: "HackTheBox",
  "security-research": "Security Research",
  securityresearch: "Security Research",
} as const;

const categoryDescriptions: Record<string, string> = {
  CTF: "Challenge walkthroughs and solution reports from CTF events.",
  HackTheBox: "HackTheBox machine writeups focusing on exploitation, privilege escalation, and lab analysis.",
  "Security Research": "Research notes on malware, detection, reverse engineering, and security tooling.",
};

function getCategorySlug(category: string) {
  return (categorySlugs as Record<string, string>)[category] ?? category.toLowerCase();
}

function getCategoryFromSlug(slug?: string) {
  if (!slug) return "All";
  return slugToCategory[slug.toLowerCase() as keyof typeof slugToCategory] ?? undefined;
}

export default function WriteupsPage() {
  const { category: categoryParam } = useParams();
  const [query, setQuery] = useState("");

  const selectedCategory = getCategoryFromSlug(categoryParam);
  if (categoryParam && !selectedCategory) {
    return <Navigate to="/writeups" replace />;
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((p) => {
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;

      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesQ;
    });
  }, [query, selectedCategory]);

  const featured = posts.filter(
    (p) => p.featured && (selectedCategory === "All" || p.category === selectedCategory)
  );

  return (
    <>
      <Helmet>
        <title>
          {selectedCategory === "All" ? "Writeups — Malware, DFIR & Detection Notes" : `${selectedCategory} Writeups — Malware, DFIR & Detection Notes`}
        </title>

        <meta
          name="description"
          content="Technical writeups on malware analysis, DFIR, detection engineering, Linux research, reverse engineering, and security tooling."
        />

        <meta
          property="og:title"
          content={selectedCategory === "All" ? "Writeups — Vishwa Kumar" : `${selectedCategory} Writeups — Vishwa Kumar`}
        />

        <meta
          property="og:description"
          content="Security writeups and notes."
        />

        <meta
          property="og:url"
          content={categoryParam ? `/writeups/${categoryParam}` : "/writeups"}
        />

        <link rel="canonical" href={categoryParam ? `/writeups/${categoryParam}` : "/writeups"} />
      </Helmet>

      <Section
        eyebrow="Writeups"
        title="Technical writeups & notes"
        description="Short, structured notes on malware analysis, DFIR, detection engineering, Linux, reverse engineering, and the small tools that make analyst work faster."
      >
        {selectedCategory === "All" && (
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories
              .filter((c) => c !== "All")
              .map((c) => {
                const slug = getCategorySlug(c);
                const count = posts.filter((p) => p.category === c).length;

                return (
                  <Link
                    key={c}
                    to={`/writeups/${slug}`}
                    className="group glass flex flex-col rounded-xl p-6 transition hover:border-primary/50"
                  >
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                      {c} Writeups
                    </h3>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                      {count} post{count === 1 ? "" : "s"}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {categoryDescriptions[c] ?? "Explore writeups for this category."}
                    </p>
                  </Link>
                );
              })}
          </div>
        )}

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-12 grid gap-4 md:grid-cols-2">
            {featured.map((p) => (
              <Link
                key={p.slug}
                to={`/writeups/${getCategorySlug(p.category)}/${p.slug}`}
                className="group glass flex flex-col rounded-xl p-6 transition hover:border-primary/50"
              >
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary">
                  featured · {p.category}
                </div>

                <h3 className="mt-3 font-display text-xl font-semibold">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {p.excerpt}
                </p>

                <PostMeta
                  date={p.date}
                  minutes={p.readingMinutes}
                />
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
            {categories.map((c) => {
              const slug = c === "All" ? "" : getCategorySlug(c);
              const to = slug ? `/writeups/${slug}` : "/writeups";

              return (
                <Link
                  key={c}
                  to={to}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    selectedCategory === c
                      ? "border-primary/60 bg-primary/15 text-foreground"
                      : "border-border bg-surface/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </Link>
              );
            })}
          </div>
        </div>

        {/* List */}
        {selectedCategory !== "All" ? (
          <div className="grid gap-3">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to={`/writeups/${getCategorySlug(p.category)}/${p.slug}`}
                className="group glass flex flex-col gap-2 rounded-xl p-5 transition hover:border-primary/50 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                    {p.category}
                  </p>

                  <h3 className="mt-1.5 font-display text-lg font-semibold">
                    {p.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.excerpt}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-border bg-surface-elevated/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <PostMeta
                    date={p.date}
                    minutes={p.readingMinutes}
                  />

                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            ))}

            {filtered.length === 0 && (
              <p className="py-10 text-center font-mono text-sm text-muted-foreground">
                no posts match.
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface-elevated/80 p-8 text-center text-sm text-muted-foreground">
            Pick a writeup category above to see the matching posts.
          </div>
        )}
      </Section>
    </>
  );
}

function PostMeta({
  date,
  minutes,
}: {
  date: string;
  minutes: number;
}) {
  return (
    <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
      <span>
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>

      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {minutes} min
      </span>
    </div>
  );
}