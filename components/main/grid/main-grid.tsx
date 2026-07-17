import { FC, ReactNode } from "react";

interface MainGridProps {
  children: ReactNode;
}

const MainGrid: FC<MainGridProps> = ({ children }) => {
  return (
    <div className="relative">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">{children}</div>
    </div>
  );
};

export default MainGrid;
