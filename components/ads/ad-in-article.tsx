"use client";

import { cn } from "@/lib/utils";

interface AdInArticleProps {
  label?: string;
  className?: string;
}

export default function AdInArticle({
  label = "Advertisement",
  className,
}: AdInArticleProps) {
  return (
    <div
      className={cn(
        "my-8 flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50 py-6",
        className
      )}
    >
      <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
        <span className="text-xs font-medium">Responsive Ad</span>
      </div>
    </div>
  );
}
