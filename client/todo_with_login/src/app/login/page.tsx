import SpinnerLoading from "@/components/SpinnerLoading";
import dynamic from "next/dynamic";

const SignUpComponent = dynamic(() => import("@/pages/Sign_in"), {
  ssr: false,
  loading: () => <SpinnerLoading size={12} />,
});

function Login() {
  return <SignUpComponent />;
}

export default Login;
