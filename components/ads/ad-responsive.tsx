"use client";

import { cn } from "@/lib/utils";

interface AdResponsiveProps {
  label?: string;
  className?: string;
}

export default function AdResponsive({
  label = "Advertisement",
  className,
}: AdResponsiveProps) {
  return (
    <>
      {/* Desktop: 728x90 */}
      <div
        className={cn(
          "hidden items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50 md:flex",
          className
        )}
        style={{ minHeight: 90 }}
      >
        <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
          <span className="text-[10px] uppercase tracking-widest">{label}</span>
          <span className="text-xs font-medium">728 x 90</span>
        </div>
      </div>

      {/* Mobile: 320x50 */}
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50 md:hidden",
          className
        )}
        style={{ minHeight: 50 }}
      >
        <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
          <span className="text-[10px] uppercase tracking-widest">{label}</span>
          <span className="text-xs font-medium">320 x 50</span>
        </div>
      </div>
    </>
  );
}
