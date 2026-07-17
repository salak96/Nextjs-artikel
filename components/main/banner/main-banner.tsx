import { mainBannerConfig } from "@/config/main";
import { GithubIcon } from "@/icons";
import Link from "next/link";

const MainBanner = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 px-6 py-12 sm:py-16 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {mainBannerConfig.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {mainBannerConfig.description}
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4">
          <Link
            href={mainBannerConfig.link}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90"
          >
            <GithubIcon className="h-4 w-4" />
            {mainBannerConfig.button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
