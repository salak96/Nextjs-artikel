import { MainDesktopNavigation, MainMobileNavigation } from "./navigations";
import { getVisibleCategories } from "@/lib/categories";

export default async function MainHeader() {
  const categories = await getVisibleCategories();
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <MainDesktopNavigation categories={categories} />
      <MainMobileNavigation categories={categories} />
    </header>
  );
}
