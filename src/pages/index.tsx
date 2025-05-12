import dynamic from "next/dynamic";
import { MapSkeleton } from "@/components/ui/Skeletons";

const MapLayout = dynamic(() => import("@/components/MapLayout"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default function Home() {
  return <MapLayout />;
}

// Ana sayfa kimlik doğrulama gerektirir (varsayılan olarak true olduğu için eklenmesine gerek yok)
Home.requireAuth = true;
