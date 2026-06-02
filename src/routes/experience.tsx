import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { experience, education, certifications } from "@/data/portfolio";
import { Briefcase, GraduationCap, Award, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — V. Vishwa Kumar" },
      { name: "description", content: "Work experience, education, and certifications of Vishwa Kumar — SOC Analyst & DFIR Enthusiast." },
      { property: "og:title", content: "Experience — V. Vishwa Kumar" },
      { property: "og:description", content: "Internships, education, and certifications in security operations and DFIR." },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: ExperiencePage,
});

const roleColors: Record<string, string> = {
  "Summer Intern": "text-cyan-400",
  "Machine Learning Intern": "text-violet-400",
  "Offensive Cyber Security Intern": "text-rose-400",
};

function ExperiencePage() {
  return (
    <Section
      eyebrow="experience"
      title="Where I've worked & learned"
      description="Internships, education, and certifications that shaped my security operations mindset."
    >
      {/* Experience Timeline */}
      <div className="mb-14">
        <div className="mb-6 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Work Experience</h2>
        </div>

        <ol className="relative space-y-0 border-l border-border/50">
          {experience.map((x, i) => (
            <li key={x.role + x.company} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[9px] top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-primary/50 bg-background">
                <span className="h-2 w-2 rounded-full bg-primary" />
              </span>

              <div className="glass rounded-xl p-6 transition-colors hover:border-border">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={`font-mono text-[11px] uppercase tracking-wider ${roleColors[x.role] ?? "text-primary"}`}>
                      {x.period}
                    </p>
                    <p className="mt-1.5 font-display text-xl font-semibold">{x.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {x.company} · <span className="font-mono text-xs">{x.location}</span>
                    </p>
                  </div>
                  <span className="rounded-full border border-border bg-surface-elevated px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {i === 0 ? "current" : "completed"}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {x.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-foreground/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Education + Certs */}
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Education</h2>
          </div>
          <div className="glass rounded-xl p-6">
            {education.map((e) => (
              <div key={e.school} className="space-y-1">
                <p className="font-display text-base font-semibold">{e.school}</p>
                <p className="text-sm text-muted-foreground">{e.degree}</p>
                <p className="font-mono text-xs text-primary">{e.period}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Certifications</h2>
          </div>
          <div className="glass rounded-xl p-6">
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 text-primary">›</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-wrap gap-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 glow-primary"
        >
          View Projects <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/resume"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm hover:bg-surface-elevated"
        >
          Full Resume & Download
        </Link>
      </div>
    </Section>
  );
}