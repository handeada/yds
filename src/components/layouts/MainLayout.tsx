import { ReactNode } from "react";
import Header from "./Header";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="h-[calc(100vh-73px)]">{children}</main>
    </div>
  );
};

export default MainLayout;
