import LayoutSwitcher from "@/components/layout/layout-switcher";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const page =
    typeof searchParams.page === "string" && +searchParams.page > 1
      ? +searchParams.page
      : 1;

  return <LayoutSwitcher page={page} />;
}
