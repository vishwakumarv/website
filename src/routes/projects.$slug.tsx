import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { projects } from "@/data/portfolio";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — Case Study` : "Project";
    const desc = p?.tagline ?? "Security project case study.";
    return {
      meta: [
        { title: `${title} · Vishwa Kumar` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${p?.slug ?? ""}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${p?.slug ?? ""}` }],
    };
  },
  notFoundComponent: () => (
    <Section><p className="text-muted-foreground">Project not found.</p></Section>
  ),
  errorComponent: ({ error }) => (
    <Section><p className="text-critical">{error.message}</p></Section>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 md:py-24">
      <Link to="/projects" className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> back to projects
      </Link>

      <header className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{p.period}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">{p.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{p.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tags.map((t: string) => (
            <span key={t} className="rounded-full border border-border bg-surface-elevated/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </header>

      <Block label="Executive Summary">{p.summary}</Block>
      <Block label="Goal">{p.goal}</Block>
      <Block label="Problem Solved">{p.problemSolved}</Block>

      <Block label="Tools Used">
        <div className="flex flex-wrap gap-1.5">
          {p.tools.map((t: string) => (
            <span key={t} className="rounded-md border border-border bg-surface-elevated/60 px-2 py-1 font-mono text-xs text-foreground/85">
              {t}
            </span>
          ))}
        </div>
      </Block>

      <Block label="Investigation Process / Methodology">
        <ol className="space-y-2 text-foreground/90">
          {p.methodology.map((m: string, i: number) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 font-mono text-[10px] text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{m}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block label="Screenshots & Evidence">
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="glass flex aspect-video items-center justify-center rounded-lg text-muted-foreground">
              <div className="text-center">
                <ImageIcon className="mx-auto h-6 w-6 opacity-50" />
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider">evidence_{i}.png</p>
                <p className="mt-1 text-xs opacity-70">screenshot placeholder</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block label="What I Did Personally">
        <ul className="space-y-2">
          {p.personalWork.map((m: string, i: number) => <Bullet key={i}>{m}</Bullet>)}
        </ul>
      </Block>

      <Block label="Findings">
        <ul className="space-y-2">
          {p.findings.map((m: string, i: number) => <Bullet key={i} tone="warning">{m}</Bullet>)}
        </ul>
      </Block>

      <Block label="Recommendations">
        <ul className="space-y-2">
          {p.recommendations.map((m: string, i: number) => <Bullet key={i} tone="success">{m}</Bullet>)}
        </ul>
      </Block>

      <Block label="Skills Demonstrated">
        <div className="flex flex-wrap gap-1.5">
          {p.skills.map((s: string) => (
            <span key={s} className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-foreground/90">
              {s}
            </span>
          ))}
        </div>
      </Block>

      <Block label="What I Learned">
        <ul className="space-y-2">
          {p.learnings.map((m: string, i: number) => <Bullet key={i}>{m}</Bullet>)}
        </ul>
      </Block>
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-border/60 pt-8">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{label}</h2>
      <div className="mt-3 text-base text-foreground/90 leading-relaxed">{children}</div>
    </section>
  );
}

function Bullet({ children, tone }: { children: React.ReactNode; tone?: "success" | "warning" }) {
  const color = tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-primary";
  return (
    <li className="flex gap-3">
      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${color}`} />
      <span className="flex-1">{children}</span>
    </li>
  );
}
