import { MainDesktopNavigation, MainMobileNavigation } from "./navigations";

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <MainDesktopNavigation />
      <MainMobileNavigation />
    </header>
  );
}
