import SharedBackButton from "@/components/shared/shared-back-button";

const LoginHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Global"
      >
        <div className="flex flex-1 items-center justify-start">
          <SharedBackButton />
        </div>
      </nav>
    </header>
  );
};

export default LoginHeader;
