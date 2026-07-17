"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ExoticComponent, FC, ReactNode } from "react";
import type { CategoryType } from "@/types";

interface MainMobileNavigationMenuProps {
  fragment: ExoticComponent<{ children?: ReactNode | undefined }>;
  categories: CategoryType[];
}

const MainMobileNavigationMenu: FC<MainMobileNavigationMenuProps> = ({
  fragment,
  categories,
}) => {
  const router = useRouter();

  return (
    <Transition
      as={fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 -translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-2"
    >
      <Disclosure.Panel className="border-t border-border bg-background px-4 pb-4 pt-2">
        <div className="space-y-1">
          {categories.map((category) => (
            <Disclosure.Button
              key={category.id || "/"}
              as="a"
              onClick={() =>
                router.push(
                  category.slug === "/" ? "/" : `/category/${category.slug}`,
                )
              }
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {category.icon && <category.icon className="h-5 w-5 text-muted-foreground" />}
              {category.title}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Transition>
  );
};

export default MainMobileNavigationMenu;
