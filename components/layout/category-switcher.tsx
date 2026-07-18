import { getLayout } from "@/lib/site-settings";
import { BlogCategory } from "@/components/layout";
import MagazineCategory from "./magazine/magazine-category";

interface CategorySwitcherProps {
  slug: string;
  page: number;
}

export default async function CategorySwitcher({ slug, page }: CategorySwitcherProps) {
  const layout = await getLayout();

  if (layout === "magazine") {
    return <MagazineCategory slug={slug} page={page} />;
  }

  return <BlogCategory slug={slug} page={page} />;
}
