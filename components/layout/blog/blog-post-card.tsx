"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { shimmer, toBase64 } from "@/lib/utils";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import readingTime from "reading-time";

interface BlogPostCardProps {
  post: PostWithCategoryWithProfile;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const readTime = readingTime(post.content || "");

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read more</span>
      </Link>
      <div className="flex h-full flex-col">
        {post.image && (
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={`/uploads/posts/${post.id}/${post.image}`}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(600, 400))}`}
            />
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-md">
                {post.category?.title}
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          {!post.image && (
            <span className="mb-2 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {post.category?.title}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.updatedAt!), "MMM dd, yyyy")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {Math.round(readTime.minutes)} min
            </span>
          </div>
          <h3 className="mt-2 text-xl font-bold leading-snug text-card-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          {post.description && (
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {post.description}
            </p>
          )}
          {post.author && (
            <div className="mt-auto flex items-center gap-3 border-t border-border pt-3">
              <Image
                src={post.author.image ?? "/images/user-placeholder.png"}
                alt={post.author.name ?? "Author"}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-border"
              />
              <p className="text-sm font-medium text-card-foreground">
                {post.author.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
