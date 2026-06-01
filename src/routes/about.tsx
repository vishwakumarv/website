import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { profile } from "@/data/portfolio";
import avatarAsset from "@/assets/avatar.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vishwa Kumar" },
      { name: "description", content: "About Vishwa Kumar — security operations mindset, Linux environments, security research, and incident response interest." },
      { property: "og:title", content: "About — Vishwa Kumar" },
      { property: "og:description", content: "Security operations mindset and continuous learning." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  {
    label: "Security Operations Mindset",
    body:
      "I think in terms of alerts, timelines, and evidence. A finding without a timeline and a recommendation is unfinished work.",
  },
  {
    label: "Linux as a Daily Driver",
    body:
      "Linux is my main environment — shell, services, logs. The compound interest of journalctl and tmux discipline shows up in every investigation.",
  },
  {
    label: "Security Research",
    body:
      "I study attacker tradecraft (web, OSINT, mobile, reverse engineering) so the defenses I build are grounded in how breaches actually happen.",
  },
  {
    label: "Incident Response Interest",
    body:
      "I treat side projects like engagements: scope, evidence, findings, recommendations, lessons learned. Documentation is part of the work.",
  },
  {
    label: "Continuous Learning",
    body:
      "CTFs, lab builds, writeups, and reading. The bar isn't completing a course — it's being able to teach the topic back as a case study.",
  },
];

function AboutPage() {
  return (
    <Section eyebrow="about" title="A blue-team mindset, in practice">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col items-start gap-6">
          <img
            src={avatarAsset}
            alt={`${profile.name} avatar`}
            className="h-40 w-40 rounded-2xl border border-border object-cover"
          />
          <div>
            <p className="font-display text-xl font-semibold">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{profile.location}</p>
          </div>
          <div className="space-y-2 text-sm">
            <Link to="/projects" className="block text-primary hover:underline">→ Project case studies</Link>
            <Link to="/resume" className="block text-primary hover:underline">→ Resume</Link>
            <a href={profile.links.writeups} target="_blank" rel="noreferrer" className="block text-primary hover:underline">→ Writeups archive ↗</a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-foreground/90 leading-relaxed">
            I'm a final-year engineering student at PSG College of Technology preparing
            for SOC, DFIR, and Security Operations roles. My work centers on three
            things: monitoring, investigation, and the small automations that make both
            faster.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            I run Linux daily, document everything I touch as a case study, and
            participate in CTFs across web, OSINT, and forensics to keep an attacker's
            perspective fresh. I'm interested in detection engineering, malware triage,
            and the boring-but-critical reliability work that holds a security program
            together.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.label} className="glass rounded-xl p-5">
                <p className="font-display text-sm font-semibold">{p.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
