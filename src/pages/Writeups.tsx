import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { writeups } from "@/lib/writeups";
import { Search } from "lucide-react";

const categories = ["ctf", "htb", "thm"] as const;
const categoryLabels: Record<typeof categories[number], string> = {
  ctf: "CTF Writeups",
  htb: "HackTheBox",
  thm: "TryHackMe",
};

function getCategoryLabel(category: string) {
  return categoryLabels[category as keyof typeof categoryLabels] ?? category;
}

function isValidCategory(category?: string): category is typeof categories[number] {
  return typeof category === "string" && categories.includes(category as typeof categories[number]);
}

export default function WriteupsPage() {
  const { category: categoryParam } = useParams();
  const [query, setQuery] = useState("");

  const selectedCategory = categoryParam && isValidCategory(categoryParam) ? categoryParam : "ctf";
  const selectedCategoryLabel = getCategoryLabel(selectedCategory);

  if (categoryParam && !isValidCategory(categoryParam)) {
    return <Navigate to="/writeups" replace />;
  }

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return writeups.filter((post) => {
      const matchesCategory = post.category === selectedCategory;
      const matchesQuery =
        !lowerQuery ||
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>{`${selectedCategoryLabel} — Malware, DFIR & Detection Notes`}</title>
        <meta
          name="description"
          content={`${selectedCategoryLabel} and walkthroughs covering challenge solutions, exploitation, and analysis.`}
        />
        <meta property="og:title" content={`${selectedCategoryLabel} — Vishwa Kumar`} />
        <meta property="og:description" content={`${selectedCategoryLabel} and notes.`} />
        <meta property="og:url" content="/writeups" />
        <link rel="canonical" href="/writeups" />
      </Helmet>

      <Section
        eyebrow="Writeups"
        title={selectedCategoryLabel}
        description="Curated challenge writeups and analysis for security competitions and labs."
      >
        <div className="mb-6">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search writeups, tags…"
              className="w-full rounded-md border border-border bg-surface/60 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/60"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-4 border-b border-border pb-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={category === "ctf" ? "/writeups" : `/writeups/${category}`}
              className={`glass flex flex-col rounded-3xl border px-6 py-4 text-sm font-semibold transition hover:border-primary/50 ${
                selectedCategory === category
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-border bg-surface/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {getCategoryLabel(category)}
            </Link>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              to={`/writeups/${post.category}/${post.slug}`}
              className="group glass flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-elevated transition hover:border-primary/50"
            >
              {post.cover ? (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="h-40 w-full object-cover"
                />
              ) : null}

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
                    {getCategoryLabel(post.category)}
                  </span>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface/80 px-2 py-1 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{new Date(post.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-border bg-surface-elevated p-12 text-center text-base text-muted-foreground">
            {selectedCategory === "htb" && "No HackTheBox writeups available yet."}
            {selectedCategory === "thm" && "No TryHackMe writeups available yet."}
            {selectedCategory === "ctf" && "No CTF writeups match your search."}
          </div>
        )}
      </Section>
    </>
  );
}
