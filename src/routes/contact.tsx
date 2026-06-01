import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { profile } from "@/data/portfolio";
import { Mail, Linkedin, Github, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vishwa Kumar" },
      { name: "description", content: "Get in touch — email, LinkedIn, GitHub, Bugcrowd, HackerOne." },
      { property: "og:title", content: "Contact — Vishwa Kumar" },
      { property: "og:description", content: "Professional contact for SOC, DFIR, and security operations opportunities." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const channels = [
    { label: "LinkedIn", value: "vishwakumarv", href: profile.links.linkedin, icon: <Linkedin className="h-4 w-4" /> },
    { label: "GitHub", value: "vishwakumarv", href: profile.links.github, icon: <Github className="h-4 w-4" /> },
    { label: "Bugcrowd", value: "vishwakumarv", href: profile.links.bugcrowd, icon: <ExternalLink className="h-4 w-4" /> },
    { label: "HackerOne", value: "vishwakumarv_", href: profile.links.hackerone, icon: <ExternalLink className="h-4 w-4" /> },
    { label: "TryHackMe", value: "vishwakumarv", href: profile.links.tryhackme, icon: <ExternalLink className="h-4 w-4" /> },
    { label: "Writeups", value: "vishwakumarv.github.io", href: profile.links.writeups, icon: <ExternalLink className="h-4 w-4" /> },
  ];

  return (
    <Section eyebrow="contact" title="Let's talk" description="For SOC, DFIR, detection engineering, or security operations roles — the fastest way to reach me is email or LinkedIn.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass rounded-xl p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">primary</p>
          <h2 className="mt-2 font-display text-xl font-semibold">Email</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a href={profile.links.email} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
            <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/60 px-3 py-2 text-xs hover:bg-surface-elevated">
              {copied ? <><Check className="h-3.5 w-3.5 text-success" /> copied</> : <><Copy className="h-3.5 w-3.5" /> copy</>}
            </button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Typical response time: within 24 hours.</p>
        </div>

        <div className="glass rounded-xl p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">channels</p>
          <h2 className="mt-2 font-display text-xl font-semibold">Find me elsewhere</h2>
          <ul className="mt-4 divide-y divide-border/60">
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} target="_blank" rel="noreferrer" className="flex items-center justify-between py-3 text-sm transition hover:text-primary">
                  <span className="inline-flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-md border border-border bg-surface-elevated text-primary">{c.icon}</span>
                    <span>{c.label}</span>
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">@{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 glass rounded-xl p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">recruiter_note</p>
        <p className="mt-2 text-sm text-foreground/90">
          Open to SOC Analyst, DFIR Analyst, Detection Engineering, and Security Operations
          roles — full-time starting 2027, internships before that. Based in {profile.location};
          open to remote and relocation.
        </p>
      </div>
    </Section>
  );
}
