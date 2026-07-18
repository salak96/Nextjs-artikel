"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { shimmer, toBase64 } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface HeroSliderProps {
  posts: PostWithCategoryWithProfile[];
}

export default function HeroSlider({ posts }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  if (!posts.length) return null;

  const next = () => setCurrent((c) => (c + 1) % posts.length);
  const prev = () => setCurrent((c) => (c - 1 + posts.length) % posts.length);
  const post = posts[current];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[21/9] min-h-[300px] sm:min-h-[400px]">
        <Image
          src={`/uploads/posts/${post.id}/${post.image}`}
          alt={post.title}
          fill
          className="object-cover transition-opacity duration-500"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 514))}`}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
          <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {post.category?.title}
          </span>
          <Link href={`/posts/${post.slug}`}>
            <h2 className="text-xl font-bold text-white sm:text-3xl hover:underline">
              {post.title}
            </h2>
          </Link>
          {post.description && (
            <p className="mt-2 line-clamp-2 max-w-xl text-sm text-white/80">
              {post.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3 text-sm text-white/70">
            {post.author && <span>{post.author.name}</span>}
            <span>{format(new Date(post.updatedAt), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 right-6 flex gap-1.5">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-primary" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
