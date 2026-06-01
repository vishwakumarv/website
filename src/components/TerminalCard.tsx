import { type ReactNode } from "react";

type Props = {
  title?: string;
  className?: string;
  children: ReactNode;
};

export function TerminalCard({ title = "shell — vishwa@soc", className = "", children }: Props) {
  return (
    <div className={`glass overflow-hidden rounded-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-border/60 bg-surface-elevated/50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-critical/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">{title}</span>
      </div>
      <div className="p-4 font-mono text-[13px] leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}
