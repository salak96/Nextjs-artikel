import { getLayout } from "@/lib/site-settings";
import { BlogHomepage, MagazineHomepage } from "@/components/layout";

interface LayoutSwitcherProps {
  page: number;
}

export default async function LayoutSwitcher({ page }: LayoutSwitcherProps) {
  const layout = await getLayout();

  if (layout === "magazine") {
    return <MagazineHomepage page={page} />;
  }

  return <BlogHomepage page={page} />;
}
