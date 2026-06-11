import { Link } from "react-router-dom";
import { Section } from "@/components/Section";
import { ChevronRight } from "lucide-react";

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

export default function WriteupsLanding() {
  return (
    <Section
      eyebrow="Writeups"
      title="Writeups"
      description="Choose a writeup category to explore detailed challenge walkthroughs and analysis."
      className="writeups-section py-10 sm:py-14 md:py-24"
    >
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/writeups/${category}`}
            className="glass group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-elevated p-8 transition hover:border-primary/60 hover:bg-surface/80"
          >
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                {getCategoryLabel(category)}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {categoryDescriptions[category]}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/writeups/${category}`}
            className="glass group flex items-start justify-between gap-3 overflow-hidden rounded-xl border border-border bg-surface-elevated p-4 transition active:scale-[0.99] hover:border-primary/60 hover:bg-surface/80"
          >
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold leading-snug text-foreground">
                {getCategoryLabel(category)}
              </h2>
              <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                {categoryDescriptions[category]}
              </p>
            </div>
            <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
