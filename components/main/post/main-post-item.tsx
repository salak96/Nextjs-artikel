import { mainPostConfig } from "@/config/main";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { format } from "date-fns";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import readingTime from "reading-time";
import { prisma } from "@/lib/prisma";

async function getPublicImageUrl(postId: string, fileName: string) {
  return `/uploads/posts/${postId}/${fileName}`;
}

async function getComments(postId: string) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
  });
  return comments;
}

interface MainPostItemProps {
  post: PostWithCategoryWithProfile;
}

const MainPostItem: React.FC<MainPostItemProps> = async ({ post }) => {
  const readTime = readingTime(post.content || "");
  const comments = await getComments(post.id || "");

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <Link href={`/read/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read more</span>
      </Link>
      <div className="flex flex-col sm:flex-row">
        {post.image && (
          <div className="relative aspect-[16/9] overflow-hidden sm:w-72 sm:shrink-0 sm:self-stretch">
            <Image
              src={await getPublicImageUrl(post.id, post.image)}
              alt={post.title ?? "Cover"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent sm:bg-gradient-to-r sm:from-black/20 sm:to-transparent" />
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                {post.category?.title}
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-1 flex-col justify-center p-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {!post.image && (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {post.category?.title}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {format(new Date(post.updatedAt!), "MMM dd, yyyy")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {getMinutes(readTime.minutes)}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              {comments.length}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          {post.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>
          )}

          <div className="mt-3 relative z-20">
            <Link
              href={`/read/${post.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {post.author && (
            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
              <Image
                src={post.author.image ?? "/images/user-placeholder.png"}
                alt={post.author.name ?? "Author"}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-border"
              />
              <div className="text-sm">
                <p className="font-medium text-card-foreground">
                  {post.author.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mainPostConfig.author}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default MainPostItem;
