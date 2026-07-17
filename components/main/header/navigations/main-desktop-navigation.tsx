import { LoginMenu } from "@/components/login";
import { LogoIcon } from "@/icons";
import Link from "next/link";
import { MainDesktopNavigationMenu } from "./menu";
import ThemeToggle from "../theme-toggle";

const MainDesktopNavigation = () => {
  return (
    <nav className="mx-auto hidden max-w-5xl items-center justify-between px-4 py-3 md:flex">
      <div className="flex flex-1 items-center gap-6">
        <Link href="/" className="shrink-0">
          <LogoIcon className="h-9 w-9" />
        </Link>
        <MainDesktopNavigationMenu />
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <ThemeToggle />
        <LoginMenu />
      </div>
    </nav>
  );
};

export default MainDesktopNavigation;
