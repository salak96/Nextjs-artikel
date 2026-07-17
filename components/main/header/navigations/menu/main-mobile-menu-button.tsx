"use client";

import { Disclosure } from "@headlessui/react";
import { Menu, X } from "lucide-react";

interface Props {
  open: boolean;
}

const MainMobileMenuButton = ({ open }: Props) => {
  return (
    <Disclosure.Button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Disclosure.Button>
  );
};

export default MainMobileMenuButton;
