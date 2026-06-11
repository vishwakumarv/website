import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { writeupByCategoryAndSlug, writeupBySlug, stripLeadingMarkdownTitle } from "@/lib/writeups";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function getCategorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

const blockCodeClass =
  "writeup-code-block my-3 overflow-x-auto rounded-lg border border-border bg-surface-elevated p-3 font-mono text-[11px] leading-relaxed text-foreground/85 sm:my-4 sm:p-4 sm:text-[13px]";
const inlineCodeClass =
  "rounded bg-surface-elevated px-1 py-0.5 font-mono text-[11px] text-primary sm:text-[13px]";

export default function WriteupDetail() {
  const { category: categoryParam, slug } = useParams();
  const slugKey = slug?.toLowerCase();
  const categoryKey = categoryParam?.toLowerCase();
  const post =
    slugKey && categoryKey
      ? writeupByCategoryAndSlug[`${categoryKey}/${slugKey}`] || writeupBySlug[slugKey]
      : slugKey
      ? writeupBySlug[slugKey]
      : undefined;

  if (!post) {
    return <Navigate to="/writeups" replace />;
  }

  const expectedCategorySlug = getCategorySlug(post.category);

  if (categoryParam && categoryParam !== expectedCategorySlug) {
    return <Navigate to={`/writeups/${expectedCategorySlug}/${post.slug}`} replace />;
  }

  const body = stripLeadingMarkdownTitle(post.body);

  return (
    <article className="writeup-article mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12 md:py-20">
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
        className="inline-flex min-h-10 items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> back to Writeups
      </Link>

      <header className="mt-4 md:mt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary sm:text-[11px]">
          {post.category}
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-semibold leading-tight tracking-tight sm:mt-2 sm:text-3xl md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground sm:mt-3 sm:text-xs">
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
          className="mt-5 h-auto w-full max-w-full rounded-xl border border-border object-cover sm:mt-6 md:mt-8 md:rounded-3xl"
        />
      ) : null}

      <div className="prose-post mt-6 md:mt-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h2: ({ children }) => (
              <h2 className="writeup-heading-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="writeup-heading-3">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="writeup-heading-4">{children}</h4>
            ),
            p: ({ children }) => <p className="writeup-paragraph">{children}</p>,
            ul: ({ children }) => <ul className="writeup-list">{children}</ul>,
            ol: ({ children }) => <ol className="writeup-list writeup-list-ordered">{children}</ol>,
            li: ({ children }) => <li className="writeup-list-item">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="writeup-blockquote">{children}</blockquote>
            ),
            hr: () => <hr className="writeup-divider" />,
            code({ className, children, ...props }) {
              const isBlock = className?.startsWith("language-");
              return isBlock ? (
                <pre className={blockCodeClass}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className={inlineCodeClass} {...props}>
                  {children}
                </code>
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
            img: ({ src, alt, ...props }) => (
              <img
                src={String(src)}
                alt={String(alt ?? "")}
                className="my-3 w-full max-w-full rounded-xl border border-border object-cover sm:my-4 md:rounded-2xl"
                {...props}
              />
            ),
            table: ({ children }) => (
              <div className="table-scroll">
                <table className="w-full">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-surface-elevated">{children}</thead>,
            th: ({ children }) => (
              <th className="px-2 py-1 text-left text-[10px] font-mono text-primary sm:text-[12px]">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-2 py-1 align-top font-mono text-[11px] sm:text-[13px]">{children}</td>
            ),
          }}
        >
          {body}
        </ReactMarkdown>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5 md:mt-10">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border bg-surface-elevated/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:text-[11px]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
