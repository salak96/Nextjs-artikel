"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { default as LoginSection } from "./login-section";

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <LogIn className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <LoginSection setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
