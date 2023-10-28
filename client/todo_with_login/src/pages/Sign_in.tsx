"use client";
import axios from "axios";
import cookies from "js-cookie";
import InvalidInputMessage from "@/components/InvalidInputMessage";
import { AuthContextInterface, CredentialsInterface } from "@/utils/interfaces";
import { login } from "@/utils/requests";
import {
  Card,
  Typography,
  CardHeader,
  CardBody,
  Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";

function Sig_in() {
  const { setIsAuthenticated, setCsrfToken, setUser } =
    useAuthContext() as AuthContextInterface;
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CredentialsInterface>({
    defaultValues: { email: "", password: "" },
  });
  const onSubmit: SubmitHandler<CredentialsInterface> = async (data) => {
    try {
      const res = await login(data);
      if (res.status === 200) {
        setIsAuthenticated(true);
        setCsrfToken(cookies.get("csrf_access_token"));
        reset();
        setUser(res.data.user);
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setUser(null);
        console.log(error.response?.data.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen flex justify-center items-center"
    >
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {/**Email */}
          <Controller
            rules={{
              required: { value: true, message: "This field is required!" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid format email!",
              },
            }}
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                error={!!errors.email}
                type="email"
                crossOrigin={"true"}
                label="Email"
                size="lg"
                {...field}
              />
            )}
          />
          {errors.email && (
            <InvalidInputMessage message={errors.email.message} />
          )}

          {/**Password */}
          <Controller
            rules={{
              required: { value: true, message: "This field is required!" },
              minLength: {
                value: 8,
                message: "The minLength must be 8 characteres.",
              },
              maxLength: {
                value: 30,
                message: "The maxLength must be 30 characteres.",
              },
            }}
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                autoComplete="off"
                error={!!errors.password}
                type="password"
                crossOrigin={"true"}
                label="Password"
                size="lg"
                {...field}
              />
            )}
          />
          {errors.password && (
            <InvalidInputMessage message={errors.password.message} />
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link href="/register">
              <span className="ml-1 font-bold text-blue-gray-700">Sign up</span>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Sig_in;
