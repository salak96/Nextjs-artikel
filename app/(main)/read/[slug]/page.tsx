import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import readingTime from "reading-time";
import ReadContent from "@/components/read/read-content";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!post) return {};

  return { title: post.title, description: post.description };
}

export default async function ReadPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { category: true, author: true },
  });

  if (!post) notFound();

  const readTime = readingTime(post.content || "");

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* Back */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Category & Meta */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {post.category?.title}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {format(new Date(post.updatedAt), "MMM dd, yyyy")}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {readTime.text}
        </span>
      </div>

      {/* Title */}
      <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground">
        {post.title}
      </h1>

      {/* Description */}
      {post.description && (
        <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>
      )}

      {/* Author */}
      {post.author && (
        <div className="mt-6 flex items-center gap-3 border-b border-border pb-6">
          <Image
            src={post.author.image || "/images/user-placeholder.png"}
            alt={post.author.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-border"
          />
          <div>
            <p className="font-medium text-foreground">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">{post.author.title || "Author"}</p>
          </div>
        </div>
      )}

      {/* Cover Image */}
      {post.image && (
        <div className="relative mt-6 aspect-video overflow-hidden rounded-xl">
          <Image
            src={post.image.startsWith("http") ? post.image : `/uploads/covers/${post.image}`}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="mt-8">
        <ReadContent content={post.content} />
      </div>
    </article>
  );
}
