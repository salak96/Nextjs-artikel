"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { shimmer, toBase64 } from "@/lib/utils";
import { Clock, TrendingUp } from "lucide-react";
import readingTime from "reading-time";

interface MagazinePostCardProps {
  post: PostWithCategoryWithProfile;
  variant?: "default" | "horizontal" | "compact" | "featured";
}

export default function MagazinePostCard({
  post,
  variant = "default",
}: MagazinePostCardProps) {
  const readTime = readingTime(post.content || "");

  if (variant === "compact") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-accent"
      >
        {post.image && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={`/uploads/posts/${post.id}/${post.image}`}
              alt={post.title}
              fill
              className="object-cover"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(64, 64))}`}
            />
          </div>
        )}
        <div className="min-w-0">
          <h4 className="line-clamp-2 text-sm font-medium text-card-foreground group-hover:text-primary">
            {post.title}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {format(new Date(post.updatedAt), "MMM dd, yyyy")}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md">
        <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">Read more</span>
        </Link>
        <div className="flex">
          {post.image && (
            <div className="relative h-36 w-48 shrink-0 overflow-hidden">
              <Image
                src={`/uploads/posts/${post.id}/${post.image}`}
                alt={post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(192, 144))}`}
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-center p-5">
            <span className="text-sm font-medium text-primary">{post.category?.title}</span>
            <h3 className="mt-2 line-clamp-2 text-base font-semibold text-card-foreground group-hover:text-primary">
              {post.title}
            </h3>
            {post.description && (
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                {post.description}
              </p>
            )}
            <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
              <span>{format(new Date(post.updatedAt), "MMM dd")}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {Math.round(readTime.minutes)}m
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md">
        <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">Read more</span>
        </Link>
        {post.image && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={`/uploads/posts/${post.id}/${post.image}`}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(600, 450))}`}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <span className="text-sm font-medium text-primary">{post.category?.title}</span>
          <h3 className="mt-2 text-xl font-bold leading-snug text-card-foreground group-hover:text-primary">
            {post.title}
          </h3>
          {post.description && (
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {post.description}
            </p>
          )}
          <div className="mt-auto flex items-center gap-3 pt-4 text-sm text-muted-foreground">
            {post.author && <span className="font-medium text-foreground">{post.author.name}</span>}
            <span>{format(new Date(post.updatedAt), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </article>
    );
  }

  // Default
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md">
      <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read more</span>
      </Link>
      {post.image && (
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={`/uploads/posts/${post.id}/${post.image}`}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(600, 400))}`}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-sm font-medium text-primary">{post.category?.title}</span>
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-card-foreground group-hover:text-primary">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {post.description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-3 pt-3 text-sm text-muted-foreground">
          <span>{format(new Date(post.updatedAt), "MMM dd")}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {Math.round(readTime.minutes)}m
          </span>
        </div>
      </div>
    </article>
  );
}
