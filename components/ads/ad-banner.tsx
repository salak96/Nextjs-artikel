"use client";

import { cn } from "@/lib/utils";

interface AdBannerProps {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
}

export default function AdBanner({
  width = 728,
  height = 90,
  label = "Advertisement",
  className,
}: AdBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50",
        className
      )}
      style={{ minHeight: height }}
    >
      <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
        <span className="text-xs font-medium">{width} x {height}</span>
      </div>
    </div>
  );
}
