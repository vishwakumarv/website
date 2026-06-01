import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { profile, skills, certifications, education, experience } from "@/data/portfolio";
import { Download, Mail, Linkedin, Github } from "lucide-react";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Vishwa Kumar" },
      { name: "description", content: "Resume of Vishwa Kumar: SOC Analyst & DFIR — skills, certifications, education, experience, and projects." },
      { property: "og:title", content: "Resume — Vishwa Kumar" },
      { property: "og:description", content: "Download resume, view skills, certifications, education and experience." },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <Section eyebrow="resume" title="Resume" description={profile.shortBio}>
      <div className="mb-10 flex flex-wrap gap-3">
        <a href={profile.links.resume} download className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 glow-primary">
          <Download className="h-4 w-4" /> Download PDF
        </a>
        <a href={profile.links.email} className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm hover:bg-surface-elevated">
          <Mail className="h-4 w-4" /> Email me
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm hover:bg-surface-elevated">
          <Linkedin className="h-4 w-4" /> LinkedIn
        </a>
        <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm hover:bg-surface-elevated">
          <Github className="h-4 w-4" /> GitHub
        </a>
      </div>

      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        {/* Left: skills + certs */}
        <aside className="space-y-8">
          <Card title="Skills">
            <div className="space-y-4">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{group}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {items.map((s) => (
                      <span key={s} className="rounded-md border border-border bg-surface-elevated/60 px-2 py-1 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Certifications">
            <ul className="space-y-2 text-sm text-foreground/90">
              {certifications.map((c) => (
                <li key={c} className="flex gap-2"><span className="text-primary">›</span>{c}</li>
              ))}
            </ul>
          </Card>

          <Card title="Education">
            {education.map((e) => (
              <div key={e.school}>
                <p className="font-medium">{e.school}</p>
                <p className="text-sm text-muted-foreground">{e.degree}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{e.period}</p>
              </div>
            ))}
          </Card>
        </aside>

        {/* Right: experience */}
        <div>
          <Card title="Experience">
            <ol className="relative space-y-8 border-l border-border/60 pl-6">
              {experience.map((x) => (
                <li key={x.role + x.company} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border border-primary bg-background" />
                  <p className="font-mono text-[11px] uppercase tracking-wider text-primary">{x.period}</p>
                  <p className="mt-1 font-display text-lg font-semibold">{x.role}</p>
                  <p className="text-sm text-muted-foreground">{x.company} · {x.location}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                    {x.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
