"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { shimmer, toBase64 } from "@/lib/utils";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import readingTime from "reading-time";

interface FeaturedPostProps {
  post: PostWithCategoryWithProfile;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const readTime = readingTime(post.content || "");

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card">
      <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read more</span>
      </Link>
      <div className="flex flex-col lg:flex-row">
        {post.image && (
          <div className="relative aspect-[16/10] overflow-hidden lg:w-3/5 lg:aspect-auto lg:min-h-[500px]">
            <Image
              src={`/uploads/posts/${post.id}/${post.image}`}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(900, 500))}`}
              priority
            />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
          <span className="mb-4 w-fit rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {post.category?.title}
          </span>
          <h2 className="text-3xl font-bold leading-tight text-card-foreground transition-colors group-hover:text-primary lg:text-4xl">
            {post.title}
          </h2>
          {post.description && (
            <p className="mt-4 line-clamp-3 text-base text-muted-foreground lg:text-lg">
              {post.description}
            </p>
          )}
          <div className="mt-6 flex items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.updatedAt!), "MMM dd, yyyy")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {Math.round(readTime.minutes)} min read
            </span>
          </div>
          <div className="mt-6 relative z-20">
            <span className="inline-flex items-center gap-2 text-base font-medium text-primary transition-colors group-hover:gap-3">
              Read Article <ArrowRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
