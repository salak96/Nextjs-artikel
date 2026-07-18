import { getLayout } from "@/lib/site-settings";
import { BlogArticle, MagazineArticle } from "@/components/layout";

interface ArticleSwitcherProps {
  slug: string;
}

export default async function ArticleSwitcher({ slug }: ArticleSwitcherProps) {
  const layout = await getLayout();

  if (layout === "magazine") {
    return <MagazineArticle slug={slug} />;
  }

  return <BlogArticle slug={slug} />;
}
