import ProtectedRoutes from "@/components/ProtectedRoutes";
import SpinnerLoading from "@/components/SpinnerLoading";
import dynamic from "next/dynamic";

const AddTaskComponent = dynamic(() => import("@/pages/AddTaskPage"), {
  ssr: false,
  loading: () => <SpinnerLoading size={10} />,
});
function page() {
  return (
    <ProtectedRoutes>
      <AddTaskComponent />
    </ProtectedRoutes>
  );
}

export default page;
