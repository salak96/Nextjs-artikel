import ArticleSwitcher from "@/components/layout/article-switcher";
import { JsonLd } from "@/components/seo";
import DetailPostHeader from "../../../../components/detail/post/detail-post-header";
import DetailPostComments from "../../../../components/detail/post/detail-post-comments";
import DetailPostFloatingBar from "../../../../components/detail/post/detail-post-floating-bar";
import { prisma } from "../../../../lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string[] };
}

async function getPost(slug: string[] | string) {
  const slugStr = Array.isArray(slug) ? slug.join("/") : slug;
  const post = await prisma.post.findUnique({
    where: { slug: slugStr },
    include: {
      category: true,
      author: true,
      comments: {
        orderBy: { createdAt: "desc" },
      },
      bookmarks: true,
    },
  });

  if (!post) return null;

  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
      id: { not: post.id },
    },
    include: { category: true },
    take: 5,
  });

  return { ...post, relatedPosts };
}

const PostPage = async ({ params }: Props) => {
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const post = await getPost(slug);
  const url = process.env.NEXT_PUBLIC_WEB_URL || "https://ub.cafe";

  if (!post) {
    return notFound();
  }

  return (
    <>
      <JsonLd
        type="Article"
        data={{
          title: post.title,
          slug: post.slug,
          description: post.description,
          image: post.image,
          postId: post.id,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
          author: post.author,
        }}
      />
      <JsonLd
        type="BreadcrumbList"
        data={{
          items: [
            { "@type": "ListItem", position: 1, name: "Home", item: url },
            {
              "@type": "ListItem",
              position: 2,
              name: post.category.title,
              item: `${url}/category/${post.category.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: `${url}/posts/${post.slug}`,
            },
          ],
        }}
      />
      <DetailPostHeader title={post.title} />
      <div className="py-6">
        <ArticleSwitcher slug={slug} />
      </div>
      <DetailPostComments postId={post.id} comments={post.comments as any} />
      <DetailPostFloatingBar id={post.id} />
    </>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_WEB_URL || "https://ub.cafe";

  return {
    title: `${post.title} - ${post.category.title}`,
    description: post.description,
    openGraph: {
      title: `${post.title} - ${post.category.title}`,
      description: post.description || "",
      url: `${url}/posts/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author ? [post.author.name] : [],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}&subTitle=${encodeURIComponent(post.category.title)}&description=${encodeURIComponent(post.description || "")}`,
          width: 1200,
          height: 630,
          alt: `${post.title} | ${post.category.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || "",
      images: [
        `/api/og?title=${encodeURIComponent(post.title)}&subTitle=${encodeURIComponent(post.category.title)}&description=${encodeURIComponent(post.description || "")}`,
      ],
    },
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
  };
}

export default PostPage;
