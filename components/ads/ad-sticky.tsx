"use client";

import { cn } from "@/lib/utils";

interface AdStickyProps {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
}

export default function AdSticky({
  width = 160,
  height = 600,
  label = "Advertisement",
  className,
}: AdStickyProps) {
  return (
    <div
      className={cn(
        "sticky top-24 flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50",
        className
      )}
      style={{ width, minHeight: height }}
    >
      <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
        <span className="text-xs font-medium">{width} x {height}</span>
      </div>
    </div>
  );
}
