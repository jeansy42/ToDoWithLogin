import SpinnerLoading from "@/components/SpinnerLoading";
import dynamic from "next/dynamic";

const RegisterComponet = dynamic(() => import("@/pages/Sign_up"), {
  ssr: false,
  loading: () => <SpinnerLoading size={12} />,
});
function Register() {
  return <RegisterComponet />;
}

export default Register;
