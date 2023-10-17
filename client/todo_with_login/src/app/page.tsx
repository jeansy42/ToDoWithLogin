import ProtectedRoutes from "@/components/ProtectedRoutes";
import SpinnerLoading from "@/components/SpinnerLoading";
import dynamic from "next/dynamic";

const DashboarComponent = dynamic(() => import("@/pages/Dashboard"), {
  ssr: false,
  loading: () => <SpinnerLoading size={12} />,
});

function Home() {
  return (
    <ProtectedRoutes>
      <DashboarComponent />
    </ProtectedRoutes>
  );
}

export default Home;
