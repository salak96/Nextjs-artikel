import { mainFooterConfig } from "@/config/main";
import Link from "next/link";
import { v4 } from "uuid";
import MainNewsletter from "./main-newsletter";

const MainFooter = () => {
  return (
    <footer className="border-t border-border bg-card" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Categories
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {mainFooterConfig.categories.map((category) => (
                    <li key={v4()}>
                      <Link
                        href={
                          category.slug === "/"
                            ? category.slug
                            : `/category/${category.slug}`
                        }
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">
                  Pages
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {mainFooterConfig.pages.map((page) => (
                    <li key={v4()}>
                      <Link
                        href={page.slug}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Socials
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {mainFooterConfig.socials.map((social) => (
                    <li key={v4()}>
                      <Link
                        href={social.url}
                        target="_blank"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {social.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {mainFooterConfig.legals.map((legal) => (
                    <li key={v4()}>
                      <Link
                        href={legal.slug}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {legal.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <MainNewsletter />
        </div>
        <div className="mt-12 border-t border-border pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-5 md:order-2">
            {mainFooterConfig.socials.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground md:order-1 md:mt-0">
            {mainFooterConfig.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
