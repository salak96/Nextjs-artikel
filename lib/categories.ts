import { prisma } from "./prisma";
import { CategoryHealthIcon, CategoryMarketingIcon, CategoryScienceIcon, CategoryTechnologyIcon } from "@/icons/categories";
import type { CategoryType } from "@/types";
import type { FC } from "react";

const iconMap: Record<string, FC> = {
  science: CategoryScienceIcon,
  health: CategoryHealthIcon,
  marketing: CategoryMarketingIcon,
  technology: CategoryTechnologyIcon,
};

export async function getVisibleCategories(): Promise<CategoryType[]> {
  const categories = await prisma.category.findMany({
    where: { hidden: false },
    orderBy: { title: "asc" },
  });

  return [
    { id: "", title: "Home", slug: "/", icon: null as any },
    ...categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
      icon: (iconMap[cat.slug.toLowerCase()] || null) as any,
    })),
  ];
}
