import { Helmet } from "react-helmet-async";
import { useParams, Navigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { writeups } from "@/lib/writeups";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["ctf", "hackthebox", "tryhackme"] as const;
const categoryLabels: Record<typeof categories[number], string> = {
  ctf: "CTF Writeups",
  hackthebox: "HackTheBox",
  tryhackme: "TryHackMe",
};

const categoryDescriptions: Record<typeof categories[number], string> = {
  ctf: "Explore capture-the-flag writeups covering cryptography, web exploitation, forensics, and binary challenges.",
  hackthebox: "Browse HackTheBox writeups for exploitation, privilege escalation, and lab analysis.",
  tryhackme: "Browse TryHackMe writeups for defensive analysis, web labs, and practical exercises.",
};

function getCategoryLabel(category: string) {
  return categoryLabels[category as keyof typeof categoryLabels] ?? category;
}

function isValidCategory(category?: string): category is typeof categories[number] {
  return typeof category === "string" && categories.includes(category as typeof categories[number]);
}

export default function WriteupsPage() {
  const { category } = useParams();
  const [query, setQuery] = useState("");

  if (!isValidCategory(category)) {
    return <Navigate to="/writeups" replace />;
  }

  const selectedCategory = category;
  const selectedCategoryLabel = getCategoryLabel(selectedCategory);

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
        <meta property="og:url" content={`/writeups/${selectedCategory}`} />
        <link rel="canonical" href={`/writeups/${selectedCategory}`} />
      </Helmet>

      <Section
        eyebrow="Writeups"
        title={selectedCategoryLabel}
        description={categoryDescriptions[selectedCategory]}
        className="writeups-section py-10 sm:py-14 md:py-24"
      >
        <div className="mb-4 md:mb-6 md:max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search writeups, tags…"
              className="w-full rounded-md border border-border bg-surface/60 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/60"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              to={`/writeups/${post.category}/${post.slug}`}
              className="group glass flex flex-col overflow-hidden rounded-xl border border-border bg-surface-elevated transition hover:border-primary/50 sm:rounded-2xl lg:rounded-3xl"
            >
              {post.cover ? (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="h-32 w-full object-cover sm:h-36 lg:h-40"
                />
              ) : null}

              <div className="flex flex-1 flex-col gap-2.5 p-4 sm:gap-4 sm:p-5 lg:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-primary sm:py-1 sm:text-[10px] sm:tracking-[0.2em]">
                    {getCategoryLabel(post.category)}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-5 text-muted-foreground sm:mt-3 sm:leading-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px] sm:tracking-[0.2em]">
                  <span>{new Date(post.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-xl border border-border bg-surface-elevated p-8 text-center text-sm text-muted-foreground sm:mt-10 sm:rounded-3xl sm:p-12 sm:text-base">
            {selectedCategory === "hackthebox" && "No HackTheBox writeups available yet."}
            {selectedCategory === "tryhackme" && "No TryHackMe writeups available yet."}
            {selectedCategory === "ctf" && "No CTF writeups available yet."}
          </div>
        )}
      </Section>
    </>
  );
}
