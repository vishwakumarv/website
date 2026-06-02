import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { posts } from "@/data/portfolio";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const Route = createFileRoute("/writeups/$slug")({
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
        { property: "og:url", content: `/writeups/${p?.slug ?? ""}` },
      ],
      links: [{ rel: "canonical", href: `/writeups/${p?.slug ?? ""}` }],
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
<Link
  to="/writeups"
  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground"
>
  <ArrowLeft className="h-3.5 w-3.5" /> back to Writeups
</Link>

      <header className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
          {p.category}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {p.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>
            {new Date(p.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {p.readingMinutes} min read
          </span>
        </div>
      </header>

      <div className="prose-post mt-8">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="mt-10 mb-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mt-8 mb-2 font-display text-xl font-semibold tracking-tight text-foreground">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-6 mb-2 font-mono text-sm font-semibold uppercase tracking-widest text-primary">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-base leading-relaxed text-foreground/90">
                {children}
              </p>
            ),
            code: ({ inline, children }: any) =>
              inline ? (
                <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[13px] text-primary">
                  {children}
                </code>
              ) : (
                <code className="block">{children}</code>
              ),
            pre: ({ children }) => (
              <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-surface-elevated p-4 font-mono text-[13px] leading-relaxed text-foreground/85">
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-4 border-l-2 border-primary pl-4 font-mono text-sm text-muted-foreground">
                {children}
              </blockquote>
            ),
            ul: ({ children }) => (
              <ul className="my-3 ml-5 list-disc space-y-1 text-foreground/90">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-3 ml-5 list-decimal space-y-1 text-foreground/90">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-base leading-relaxed">{children}</li>
            ),
            table: ({ children }) => (
              <div className="my-4 overflow-x-auto rounded-lg border border-border">
                <table className="w-full font-mono text-sm">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border-b border-border bg-surface-elevated px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border-b border-border px-4 py-2 text-foreground/85">
                {children}
              </td>
            ),
            hr: () => <hr className="my-8 border-border" />,
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-foreground"
              >
                {children}
              </a>
            ),
          }}
        >
          {p.body}
        </ReactMarkdown>
      </div>

      <div className="mt-10 flex flex-wrap gap-1.5">
        {p.tags.map((t: string) => (
          <span
            key={t}
            className="rounded border border-border bg-surface-elevated/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            #{t}
          </span>
        ))}
      </div>
    </article>
  );
}
