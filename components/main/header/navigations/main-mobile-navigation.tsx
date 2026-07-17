"use client";

import { LoginMenu } from "@/components/login";
import { Disclosure } from "@headlessui/react";
import React, { Fragment } from "react";
import { MainMobileMenuButton, MainMobileNavigationMenu } from "./menu";
import ThemeToggle from "../theme-toggle";
import type { CategoryType } from "@/types";

interface Props {
  categories: CategoryType[];
}

const MainMobileNavigation = ({ categories }: Props) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:hidden">
            <div className="flex items-center gap-2">
              <LoginMenu />
              <ThemeToggle />
            </div>

            <div className="flex flex-1 justify-end">
              <MainMobileMenuButton open={open} />
            </div>
          </nav>

          <MainMobileNavigationMenu fragment={Fragment} categories={categories} />
        </>
      )}
    </Disclosure>
  );
};

export default MainMobileNavigation;
