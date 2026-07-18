import CategorySwitcher from "@/components/layout/category-switcher";
import { seoData } from "@/config/root/seo";
import { getOgImageUrl, getUrl } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

  const url = process.env.NEXT_PUBLIC_WEB_URL || "https://ub.cafe";

  return {
    title: category.title,
    description: `Articles in ${category.title} - ${seoData.absoluteTitle}`,
    authors: {
      name: seoData.author.name,
      url: seoData.author.twitterUrl,
    },
    openGraph: {
      title: category.title,
      description: `Articles in ${category.title}`,
      type: "website",
      url: `${url}/category/${slug}`,
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
      description: `Articles in ${category.title}`,
      images: [getOgImageUrl(category.title, seoData.absoluteTitle, seoData.tags, slug)],
    },
    alternates: {
      canonical: `/category/${slug}`,
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

  const page =
    typeof searchParams.page === "string" && +searchParams.page > 1
      ? +searchParams.page
      : 1;

  return <CategorySwitcher slug={slug} page={page} />;
}
