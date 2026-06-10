import { Link } from "react-router-dom";
import { Section } from "@/components/Section";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const categories = ["ctf", "htb", "thm"] as const;
const categoryLabels: Record<typeof categories[number], string> = {
  ctf: "CTF Writeups",
  htb: "HackTheBox",
  thm: "TryHackMe",
};

const categoryDescriptions: Record<typeof categories[number], string> = {
  ctf: "Explore capture-the-flag writeups covering cryptography, web exploitation, forensics, and binary challenges.",
  htb: "Browse HackTheBox writeups for exploitation, privilege escalation, and lab analysis.",
  thm: "Browse TryHackMe writeups for defensive analysis, web labs, and practical exercises.",
};

function getCategoryLabel(category: string) {
  return categoryLabels[category as keyof typeof categoryLabels] ?? category;
}

export default function WriteupsLanding() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const selectedCategory = categories[selectedIndex];
  const selectedLabel = getCategoryLabel(selectedCategory);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && selectedIndex < categories.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
      if (diff < 0 && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    }
  };

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
            to={category === "ctf" ? "/writeups/ctf" : `/writeups/${category}`}
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

      <div
        className="md:hidden mb-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="glass rounded-3xl border border-border bg-surface-elevated p-6 transition">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">
            {selectedLabel}
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            {selectedLabel}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {categoryDescriptions[selectedCategory]}
          </p>
          <Link
            to={selectedCategory === "ctf" ? "/writeups/ctf" : `/writeups/${selectedCategory}`}
            className="mt-8 inline-flex rounded-full border border-primary/60 bg-primary/15 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20"
          >
            Open {selectedLabel}
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)}
            disabled={selectedIndex === 0}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center justify-center gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`h-2 rounded-full transition ${
                  index === selectedIndex ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
                aria-label={`Select ${getCategoryLabel(categories[index])}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => selectedIndex < categories.length - 1 && setSelectedIndex(selectedIndex + 1)}
            disabled={selectedIndex === categories.length - 1}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
