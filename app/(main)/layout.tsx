import { MainFooter, MainGrid, MainHeader } from "@/components/main";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainHeader />
      <MainGrid>
        <div className="mx-auto max-w-3xl">{children}</div>
      </MainGrid>
      <MainFooter />
    </>
  );
}
