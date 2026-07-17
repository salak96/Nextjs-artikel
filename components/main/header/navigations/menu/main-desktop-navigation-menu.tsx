"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CategoryType } from "@/types";

interface Props {
  categories: CategoryType[];
}

const MainDesktopNavigationMenu = ({ categories }: Props) => {
  const currentPath = usePathname();
  return (
    <div className="hidden items-center gap-1 md:flex">
      {categories.map((category) => {
        const href = category.slug === "/" ? "/" : `/category/${category.slug}`;
        const isActive = currentPath === href;
        return (
          <Link
            key={category.id || "/"}
            href={href}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
};

export default MainDesktopNavigationMenu;
