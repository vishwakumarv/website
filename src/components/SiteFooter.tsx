import { Link } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-base font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.title}</p>
          <p className="mt-3 max-w-xs text-xs text-muted-foreground">
            Building toward SOC Analyst, DFIR, and Security Operations roles.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Link to="/projects" className="text-muted-foreground hover:text-foreground">Projects</Link>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
          <Link to="/resume" className="text-muted-foreground hover:text-foreground">Resume</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
          <a href={profile.links.writeups} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">Writeups ↗</a>
        </div>

        <div className="flex flex-wrap items-start gap-2 md:justify-end">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground" aria-label="GitHub"><Github className="h-4 w-4" /></a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
          <a href={profile.links.email} className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground" aria-label="Email"><Mail className="h-4 w-4" /></a>
          <a href={profile.links.bugcrowd} target="_blank" rel="noreferrer" className="rounded-md border border-border px-2 py-2 text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">Bugcrowd<ExternalLink className="h-3 w-3" /></a>
          <a href={profile.links.hackerone} target="_blank" rel="noreferrer" className="rounded-md border border-border px-2 py-2 text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">HackerOne<ExternalLink className="h-3 w-3" /></a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <span className="font-mono">© {new Date().getFullYear()} {profile.name}</span>
          <span className="font-mono"><span className="scan-dot" />systems nominal</span>
        </div>
      </div>
    </footer>
  );
}
