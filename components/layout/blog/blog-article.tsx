import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import readingTime from "reading-time";
import { AdBanner, AdInArticle, AdResponsive } from "@/components/ads";
import Sidebar from "../sidebar";
import { shimmer, toBase64 } from "@/lib/utils";
import dynamic from "next/dynamic";

const ReadContent = dynamic(() => import("@/components/read/read-content"), { ssr: false });

interface BlogArticleProps {
  slug: string;
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
      comments: { orderBy: { createdAt: "desc" } },
      bookmarks: true,
    },
  });
  if (!post) return null;

  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
      id: { not: post.id },
    },
    include: { category: true, author: true },
    take: 4,
  });

  return { ...post, relatedPosts };
}

export default async function BlogArticle({ slug }: BlogArticleProps) {
  const post = await getPost(slug);
  if (!post) return notFound();

  const readTime = readingTime(post.content || "");

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <article className="lg:col-span-2">
        <div className="mx-auto max-w-2xl">
          <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/category/${post.category?.slug}`} className="hover:text-foreground">
              {post.category?.title}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-foreground">{post.title}</span>
          </nav>

          <Link
            href={`/category/${post.category?.slug}`}
            className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {post.category?.title}
          </Link>

          <h1 className="text-3xl font-bold leading-tight text-foreground lg:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                <Image
                  src={post.author.image ?? "/images/user-placeholder.png"}
                  alt={post.author.name ?? "Author"}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="font-medium text-foreground">{post.author.name}</span>
              </div>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {format(new Date(post.updatedAt), "MMMM dd, yyyy")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {Math.round(readTime.minutes)} min read
            </span>
          </div>

          <div className="my-6">
            <AdBanner width={728} height={90} />
          </div>

          {post.image && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={`/uploads/posts/${post.id}/${post.image}`}
                alt={post.title}
                fill
                className="object-cover"
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(800, 450))}`}
                priority
              />
            </div>
          )}

          <div className="mt-8">
            <ReadContent content={post.content} />
          </div>

          <div className="my-6">
            <AdInArticle />
          </div>

          <div className="my-8">
            <AdBanner width={728} height={90} label="Advertisement" />
          </div>

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-xl font-bold text-foreground">Related Articles</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {post.relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/posts/${related.slug}`}
                    className="group rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
                  >
                    <span className="text-xs font-medium text-primary">
                      {related.category?.title}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold text-card-foreground group-hover:text-primary">
                      {related.title}
                    </h3>
                    {related.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {related.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <AdResponsive label="Mobile Ad" />
      </div>
    </div>
  );
}
