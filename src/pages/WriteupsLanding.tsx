import { Link } from "react-router-dom";
import { Section } from "@/components/Section";

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
    >
      <div className="hidden gap-6 md:grid md:grid-cols-3 mb-8">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/writeups/${category}`}
            className="glass group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-elevated p-8 transition hover:border-primary/60 hover:bg-surface/80"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">
                {getCategoryLabel(category)}
              </p>
              <h2 className="mt-6 text-2xl font-semibold text-foreground">
                {getCategoryLabel(category)}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {categoryDescriptions[category]}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Open category
            </span>
          </Link>
        ))}
      </div>

      <div className="relative mb-8 md:hidden">
        <div className="relative h-[28rem] max-w-[24rem] mx-auto">
          {categories.map((category, index) => {
            const topOffset = index * 20;
            const scale = 1 - index * 0.03;
            const zIndex = categories.length - index;
            return (
              <Link
                key={category}
                to={`/writeups/${category}`}
                className="glass group absolute left-0 right-0 overflow-hidden rounded-[2rem] border border-border bg-surface-elevated p-6 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.8)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_120px_-40px_rgba(0,0,0,0.85)]"
                style={{
                  top: `${topOffset}px`,
                  transform: `scale(${scale})`,
                  zIndex,
                }}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-primary">
                      {getCategoryLabel(category)}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold text-foreground">
                      {getCategoryLabel(category)}
                    </h2>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {categoryDescriptions[category]}
                  </p>
                  <span className="mt-auto inline-flex rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition group-hover:bg-primary/15">
                    Open {getCategoryLabel(category)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
