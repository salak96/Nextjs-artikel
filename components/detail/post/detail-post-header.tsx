"use client";

import { LoginMenu } from "@/components/login";
import { SharedBackButton } from "@/components/shared";
import { useReadingProgress } from "@/hooks/use-reading-progress";

interface DetailPostHeaderProps {
  title: string;
}

const DetailPostHeader: React.FC<DetailPostHeaderProps> = ({ title }) => {
  const completion = useReadingProgress();
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"
        aria-label="Global"
      >
        <div className="flex flex-none items-center">
          <SharedBackButton />
        </div>
        <div className="mx-4 flex-1 overflow-hidden">
          <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">
            {title}
          </h1>
        </div>
        <div className="flex flex-none items-center">
          <LoginMenu />
        </div>
      </nav>
      <span
        style={{ transform: `translateX(${completion - 100}%)` }}
        className="absolute bottom-0 left-0 h-0.5 w-full bg-primary transition-transform"
      />
    </header>
  );
};

export default DetailPostHeader;
