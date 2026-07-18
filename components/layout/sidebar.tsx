import { prisma } from "@/lib/prisma";
import { AdSidebar } from "@/components/ads";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Search, TrendingUp, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import SidebarNewsletter from "./sidebar-newsletter";

async function getPopularPosts() {
  try {
    return await prisma.post.findMany({
      include: { category: true, author: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({
      where: { hidden: false },
      orderBy: { title: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function Sidebar() {
  const [popularPosts, categories] = await Promise.all([
    getPopularPosts(),
    getCategories(),
  ]);

  return (
    <aside className="sticky top-24 space-y-6">
      {/* Search */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Search</h3>
        <form action="/category/search" method="GET">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </form>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            <TrendingUp className="mr-1 inline h-4 w-4" />
            Popular Posts
          </h3>
          <div className="space-y-4">
            {popularPosts.map((post, i) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group flex gap-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(post.updatedAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Ad 300x250 */}
      <AdSidebar width={300} height={250} />

      {/* Newsletter */}
      <SidebarNewsletter />

      {/* Ad 300x600 */}
      <AdSidebar width={300} height={600} />

      {/* Social Media */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Follow Us</h3>
        <div className="flex gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
            <Youtube className="h-4 w-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}
