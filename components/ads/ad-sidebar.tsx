"use client";

import { cn } from "@/lib/utils";

interface AdSidebarProps {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
}

export default function AdSidebar({
  width = 300,
  height = 250,
  label = "Advertisement",
  className,
}: AdSidebarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50",
        className
      )}
      style={{ minHeight: height, maxWidth: width }}
    >
      <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
        <span className="text-xs font-medium">{width} x {height}</span>
      </div>
    </div>
  );
}
