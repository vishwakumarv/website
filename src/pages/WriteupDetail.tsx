import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { writeupBySlug } from "@/lib/writeups";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function getCategorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export default function WriteupDetail() {
  const { category: categoryParam, slug } = useParams();
  const post = slug ? writeupBySlug[slug.toLowerCase()] : undefined;

  if (!post) {
    return <Navigate to="/writeups" replace />;
  }

  const expectedCategorySlug = getCategorySlug(post.category);

  if (categoryParam && categoryParam !== expectedCategorySlug) {
    return <Navigate to={`/writeups/${expectedCategorySlug}/${post.slug}`} replace />;
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <Helmet>
        <title>{post.title} — Vishwa Kumar</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`/writeups/${expectedCategorySlug}/${post.slug}`} />
        <link rel="canonical" href={`/writeups/${expectedCategorySlug}/${post.slug}`} />
      </Helmet>

      <Link
        to={categoryParam ? `/writeups/${categoryParam}` : "/writeups"}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> back to Writeups
      </Link>

      <header className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
          {post.category}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readingMinutes} min read
          </span>
        </div>
      </header>

      {post.cover ? (
        <img
          src={post.cover}
          alt={post.title}
          className="mt-8 rounded-3xl border border-border object-cover"
        />
      ) : null}

      <div className="prose-post mt-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ inline, className, children, ...props }) {
              return inline ? (
                <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[13px] text-primary" {...props}>
                  {children}
                </code>
              ) : (
                <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-surface-elevated p-4 font-mono text-[13px] leading-relaxed text-foreground/85">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
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
          {post.body}
        </ReactMarkdown>
      </div>

      <div className="mt-10 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border bg-surface-elevated/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
