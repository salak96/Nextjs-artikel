import { MainPostItem } from "@/components/main";
import { SharedEmpty, SharedPagination } from "@/components/shared";
import { seoData } from "@/config/root/seo";
import { getOgImageUrl, getUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
import { v4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

interface CategoryPageProps {
  params: {
    slug: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const slug = params?.slug?.join("/");
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) return {};

  return {
    title: category.title,
    description: seoData.absoluteTitle,
    authors: {
      name: seoData.author.name,
      url: seoData.author.twitterUrl,
    },
    openGraph: {
      title: category.title,
      description: seoData.absoluteTitle,
      type: "article",
      url: `${getUrl()}${slug}`,
      images: [
        {
          url: getOgImageUrl(category.title, seoData.absoluteTitle, seoData.tags, slug),
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.title,
      description: seoData.absoluteTitle,
      images: [getOgImageUrl(category.title, seoData.absoluteTitle, seoData.tags, slug)],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const slug = params?.slug?.join("/");
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) notFound();

  const limit = 10;
  const page =
    typeof searchParams.page === "string" && +searchParams.page > 1
      ? +searchParams.page
      : 1;
  const skip = (page - 1) * limit;

  const count = await prisma.post.count({ where: { categoryId: category.id } });
  const totalPages = count ? Math.ceil(count / limit) : 0;

  const data = await prisma.post.findMany({
    where: { categoryId: category.id },
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });

  if (!data || !data.length) notFound();

  return (
    <>
      <div className="my-5 space-y-6">
        {data?.length === 0 ? (
          <SharedEmpty />
        ) : (
          data?.map((post) => <MainPostItem key={v4()} post={post} />)
        )}
      </div>
      {totalPages > 1 && (
        <SharedPagination
          page={page}
          totalPages={totalPages}
          baseUrl={`/category/${slug}`}
          pageUrl="?page="
        />
      )}
    </>
  );
}
