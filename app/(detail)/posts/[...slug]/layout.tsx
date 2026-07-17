export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background py-6">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">{children}</div>
    </div>
  );
}
