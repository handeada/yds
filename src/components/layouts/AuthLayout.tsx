import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { selectAuth } from "@/store/auth";
import { useSelector } from "react-redux";
import { ROUTES } from "@/constants/constants";
import { SkeletonSection } from "@/components/ui/Skeleton";

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
      push(ROUTES.login);
    }
    if (!requireAuth && isAuthenticated) {
      push(ROUTES.home);
    }
  }, [isAuthenticated, push, requireAuth]);

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <SkeletonSection lines={5} className="max-w-md w-full" />
      </div>
    );
  }

  return <>{children}</>;
}
