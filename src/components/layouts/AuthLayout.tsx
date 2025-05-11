import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { selectAuth } from "@/store/auth";
import { useSelector } from "react-redux";
import { ROUTES } from "@/constants/constants";

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
      push(ROUTES.login);
    }
    if (!requireAuth && isAuthenticated) {
      push(ROUTES.home);
    }
  }, [isAuthenticated, push, requireAuth]);

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return <div>Yükleniyor...</div>;
  }

  return <>{children}</>;
}
