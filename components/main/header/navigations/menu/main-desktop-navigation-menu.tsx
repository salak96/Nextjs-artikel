"use client";

import { mainCategoryConfig } from "@/config/main";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";

const MainDesktopNavigationMenu = () => {
  const currentPath = usePathname();
  return (
    <div className="hidden items-center gap-1 md:flex">
      {mainCategoryConfig.map((category) => {
        const href =
          category.slug === "/"
            ? category.slug
            : `/category/${category.slug}`;
        const isActive = currentPath === href;
        return (
          <Link
            href={href}
            key={v4()}
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
