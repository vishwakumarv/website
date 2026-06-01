import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { TerminalCard } from "@/components/TerminalCard";
import { profile, recruiterSnapshot, projects } from "@/data/portfolio";
import avatarAsset from "@/assets/avatar.png";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Search,
  FileText,
  GitBranch,
  Bot,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishwa Kumar — SOC Analyst & DFIR Portfolio" },
      { name: "description", content: "Recruiter-first portfolio for SOC Analyst, DFIR, Detection Engineering, and Security Operations roles." },
      { property: "og:title", content: "Vishwa Kumar — SOC Analyst & DFIR Portfolio" },
      { property: "og:description", content: "SOC, DFIR, and security operations — projects, writeups, and resume." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const snapshotIcons = [ShieldCheck, Terminal, Search, FileText, GitBranch, Bot];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-16 sm:px-6 md:grid-cols-[1.2fr_1fr] md:gap-10 md:pb-24 md:pt-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
              <span className="scan-dot" />available for SOC / DFIR roles · {profile.location}
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-gradient">{profile.name}</span>
              <span className="block text-foreground/85 text-2xl sm:text-3xl md:text-4xl mt-3 font-medium">
                SOC Analyst · DFIR Enthusiast · Security Operations
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              I focus on blue team security — monitoring, incident investigation, threat
              analysis, and security automation. I build small tools, document cases like
              real engagements, and study attacker tradecraft so I can defend faster.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary">
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={profile.links.resume} download className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm font-medium hover:bg-surface-elevated">
                <Download className="h-4 w-4" /> Download Resume
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm font-medium hover:bg-surface-elevated">
                <Mail className="h-4 w-4" /> Contact
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <SocialPill href={profile.links.github} icon={<Github className="h-3.5 w-3.5" />}>GitHub</SocialPill>
              <SocialPill href={profile.links.linkedin} icon={<Linkedin className="h-3.5 w-3.5" />}>LinkedIn</SocialPill>
              <SocialPill href={profile.links.bugcrowd}>Bugcrowd</SocialPill>
              <SocialPill href={profile.links.hackerone}>HackerOne</SocialPill>
              <SocialPill href={profile.links.tryhackme}>TryHackMe</SocialPill>
              <SocialPill href={profile.links.hackthebox}>Hack The Box</SocialPill>
              <SocialPill href={profile.links.email} icon={<Mail className="h-3.5 w-3.5" />}>Email</SocialPill>
            </div>
          </div>

          {/* Right column: avatar + terminal */}
          <div className="flex flex-col items-center gap-5 md:items-end">
            <div className="float-slow relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-xl" aria-hidden />
              <img
                src={avatarAsset}
                alt={`${profile.name} avatar`}
                className="relative h-44 w-44 rounded-2xl border border-border object-cover shadow-2xl"
                loading="eager"
              />
            </div>

            <TerminalCard className="w-full max-w-md">
              <div className="space-y-1.5">
                <Line prompt>whoami</Line>
                <Line>vishwa.kumar — soc / dfir track</Line>
                <Line prompt>cat ./targets.txt</Line>
                <Line>SOC Analyst</Line>
                <Line>DFIR Analyst</Line>
                <Line>Detection Engineering</Line>
                <Line>Security Operations</Line>
                <Line prompt>./status --check</Line>
                <Line tone="success"><span className="scan-dot" />ready · open to opportunities</Line>
              </div>
            </TerminalCard>
          </div>
        </div>
      </section>

      {/* RECRUITER SNAPSHOT */}
      <Section
        eyebrow="recruiter_snapshot"
        title="What you're hiring"
        description="A quick-read scorecard for SOC, DFIR, and Security Operations interviewers."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recruiterSnapshot.map((item, i) => {
            const Icon = snapshotIcons[i % snapshotIcons.length];
            return (
              <div key={item.label} className="group glass rounded-xl p-5 transition hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface-elevated text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="font-display text-sm font-semibold">{item.label}</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{item.value}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* FLAGSHIP PROJECTS */}
      <Section
        eyebrow="flagship_projects"
        title="Three projects, three case studies"
        description="Each project is written like an engagement — problem, work performed, findings, and recommendations."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group glass relative flex flex-col rounded-xl p-6 transition hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{p.period}</p>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>

              <dl className="mt-5 space-y-3 text-sm">
                <Field label="Problem">{p.problem}</Field>
                <Field label="Solution">{p.solution}</Field>
                <Field label="Security relevance">{p.relevance}</Field>
              </dl>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-surface-elevated/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            See all project details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="glass overflow-hidden rounded-2xl p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">next_step</p>
              <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                Hiring for a SOC, DFIR, or Detection role?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Resume, references, and project deep-dives are one click away.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={profile.links.resume} download className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 glow-primary">
                <Download className="h-4 w-4" /> Resume (PDF)
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm hover:bg-surface-elevated">
                <Mail className="h-4 w-4" /> Get in touch
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground/90">{children}</dd>
    </div>
  );
}

function SocialPill({ href, icon, children }: { href: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
    >
      {icon}
      {children}
      {isExternal && <ExternalLink className="h-3 w-3 opacity-60" />}
    </a>
  );
}

function Line({ children, prompt, tone }: { children: React.ReactNode; prompt?: boolean; tone?: "success" }) {
  return (
    <div className={tone === "success" ? "text-success" : ""}>
      {prompt && <span className="text-primary">$ </span>}
      {!prompt && <span className="text-muted-foreground">› </span>}
      <span>{children}</span>
    </div>
  );
}
