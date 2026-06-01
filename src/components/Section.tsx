import { type ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          )}
          {description && (
            <p className="mt-4 text-base text-muted-foreground md:text-lg">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
