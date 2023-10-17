import ProtectedRoutes from "@/components/ProtectedRoutes";
import SpinnerLoading from "@/components/SpinnerLoading";
import {
  getMonthTasks,
  getTodayTasks,
  getTomorrowTasks,
  getWeekTasks,
  getYearTasks,
} from "@/utils/requestsTasks";
import dynamic from "next/dynamic";
const TaskPageComponent = dynamic(() => import("@/pages/TasksPage"), {
  ssr: false,
  loading: () => <SpinnerLoading size={12} />,
});

function Tasks() {
  return (
    <ProtectedRoutes>
      <TaskPageComponent />
    </ProtectedRoutes>
  );
}

export default Tasks;
