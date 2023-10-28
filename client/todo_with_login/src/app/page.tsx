"use client";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import SpinnerLoading from "@/components/SpinnerLoading";
import DashboardContext from "@/context/DashboardContext";
import dynamic from "next/dynamic";

const DashboarComponent = dynamic(() => import("@/pages/Dashboard"), {
  ssr: false,
  loading: () => <SpinnerLoading size={12} />,
});

function Home() {
  return (
    <ProtectedRoutes>
      <DashboardContext>
        <DashboarComponent />
      </DashboardContext>
    </ProtectedRoutes>
  );
}

export default Home;
