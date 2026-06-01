import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { posts } from "@/data/portfolio";
import { ArrowLeft, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    return {
      meta: [
        { title: `${p?.title ?? "Post"} — Vishwa Kumar` },
        { name: "description", content: p?.excerpt ?? "Security writeup." },
        { property: "og:title", content: p?.title ?? "Post" },
        { property: "og:description", content: p?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${p?.slug ?? ""}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${p?.slug ?? ""}` }],
    };
  },
  notFoundComponent: () => (
    <Section><p className="text-muted-foreground">Post not found.</p></Section>
  ),
  errorComponent: ({ error }) => (
    <Section><p className="text-critical">{error.message}</p></Section>
  ),
  component: PostPage,
});

function PostPage() {
  const { post: p } = Route.useLoaderData();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <Link to="/blog" className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> back to blog
      </Link>

      <header className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{p.category}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h1>
        <div className="mt-3 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>{new Date(p.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readingMinutes} min read</span>
        </div>
      </header>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
        {p.body.map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-1.5">
        {p.tags.map((t: string) => (
          <span key={t} className="rounded border border-border bg-surface-elevated/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            #{t}
          </span>
        ))}
      </div>
    </article>
  );
}
