import DetailPostHeader from "../../../../components/detail/post/detail-post-header";
import DetailPostComments from "../../../../components/detail/post/detail-post-comments";
import DetailPostFloatingBar from "../../../../components/detail/post/detail-post-floating-bar";
import { prisma } from "../../../../lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
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
  const post = await getPost(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-2xl pb-24">
        <DetailPostHeader title={post.title} />
        <DetailPostComments postId={post.id} comments={post.comments as any} />
        <DetailPostFloatingBar id={post.id} />
      </div>
    </>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - ${post.category.slug}`,
    description: post.description,
    openGraph: {
      title: `${post.title} - ${post.category.slug}`,
      description: post.description || "",
      url: `https://ub.cafe/posts/${post.slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}&subTitle=${encodeURIComponent(post.category.slug)}&description=${encodeURIComponent(post.description || "")}`,
          width: 1200,
          height: 630,
          alt: `${post.title} | ${post.category.slug}`,
        },
      ],
    },
  };
}

export default PostPage;