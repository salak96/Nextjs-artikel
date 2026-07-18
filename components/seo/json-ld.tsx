interface JsonLdProps {
  type: "Website" | "Article" | "Organization" | "BreadcrumbList";
  data?: Record<string, any>;
}

export default function JsonLd({ type, data = {} }: JsonLdProps) {
  let jsonLd: Record<string, any> = {};

  const url = process.env.NEXT_PUBLIC_WEB_URL || "https://ub.cafe";
  const siteName = "Gemar Baca";

  switch (type) {
    case "Website":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url,
        ...data,
      };
      break;

    case "Organization":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url,
        ...data,
      };
      break;

    case "Article":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${url}/posts/${data.slug}`,
        },
        headline: data.title,
        description: data.description,
        image: data.image ? `${url}/uploads/posts/${data.postId}/${data.image}` : undefined,
        datePublished: data.createdAt,
        dateModified: data.updatedAt,
        author: data.author
          ? {
              "@type": "Person",
              name: data.author.name,
              url: data.author.website || undefined,
            }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: siteName,
        },
      };
      break;

    case "BreadcrumbList":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.items || [],
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
