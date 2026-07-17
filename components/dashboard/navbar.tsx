"use client";

import type { AdminUser } from "@/lib/admin";
import { Menu, Search, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardSidebar } from "./sidebar";
import ThemeToggle from "@/components/main/header/theme-toggle";

interface NavbarProps {
  admin: NonNullable<AdminUser>;
}

export function DashboardNavbar({ admin }: NavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search (optional) */}
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 sm:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground lg:w-60"
          />
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />

          <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>

          <div className="flex items-center gap-2 border-l border-border pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {admin.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="hidden text-sm lg:block">
              <p className="font-medium text-foreground">{admin.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground">{admin.email}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar drawer */}
      {mobileMenuOpen && (
        <DashboardSidebar
          admin={admin}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
