import dynamic from "next/dynamic";
import { MapSkeleton } from "@/components/ui/Skeletons";

const MapLayout = dynamic(() => import("@/components/MapLayout"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default function Home() {
  return <MapLayout />;
}

Home.requireAuth = true;
