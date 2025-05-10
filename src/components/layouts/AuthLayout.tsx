import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { selectAuth } from "@/store/auth";
import { useSelector } from "react-redux";

type AuthLayoutProps = {
  children: ReactNode;
  requireAuth: boolean;
};

export default function AuthLayout({ children, requireAuth }: AuthLayoutProps) {
  const { push } = useRouter();
  const { user } = useSelector(selectAuth);
  const { isAuthenticated } = user;

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      push("/login");
    }
    if (!requireAuth && isAuthenticated) {
      push("/");
    }
  }, [isAuthenticated, push, requireAuth]);

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return <div>Yükleniyor...</div>;
  }

  return <>{children}</>;
}
