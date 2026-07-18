"use client";

import { cn } from "@/lib/utils";

interface AdFloatingStickyProps {
  className?: string;
}

export default function AdFloatingSticky({ className }: AdFloatingStickyProps) {
  return (
    <div
      className={cn(
        "sticky top-24 hidden items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50 xl:flex",
        className
      )}
      style={{ width: 160, minHeight: 600 }}
    >
      <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
        <span className="text-[10px] uppercase tracking-widest">Advertisement</span>
        <span className="text-xs font-medium">160 x 600</span>
      </div>
    </div>
  );
}
