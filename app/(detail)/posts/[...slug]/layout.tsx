import { MainFooter } from "@/components/main";

export default async function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
