"use client";

import type { AdminUser } from "@/lib/admin";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Users,
  MessageSquare,
  UserCircle,
  Bookmark,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", href: "/paneladmin", icon: LayoutDashboard },
  { label: "Posts", href: "/paneladmin/posts", icon: FileText },
  { label: "Categories", href: "/paneladmin/categories", icon: FolderTree },
  { label: "Authors", href: "/paneladmin/authors", icon: Users },
  { label: "Comments", href: "/paneladmin/comments", icon: MessageSquare },
  { label: "Users", href: "/paneladmin/users", icon: UserCircle },
  { label: "Bookmarks", href: "/paneladmin/bookmarks", icon: Bookmark },
  { label: "Settings", href: "/paneladmin/settings", icon: Settings },
];

interface SidebarProps {
  admin: NonNullable<AdminUser>;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({ admin, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          A
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-foreground">Admin</span>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/paneladmin" && pathname.startsWith(item.href + "/"));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-3">
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
            router.push("/login");
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle - desktop only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden border-t border-border p-3 text-muted-foreground hover:text-foreground md:flex md:items-center md:justify-center"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden border-r border-border bg-card md:flex md:flex-col md:transition-all md:duration-300",
          collapsed ? "md:w-16" : "md:w-60",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 h-full w-60 border-r border-border bg-card">
            <div className="flex justify-end p-2">
              <button onClick={onMobileClose} className="rounded-lg p-1 text-muted-foreground hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
