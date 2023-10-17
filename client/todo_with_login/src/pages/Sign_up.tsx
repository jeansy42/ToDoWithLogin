"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import InvalidInputMessage from "@/components/InvalidInputMessage";
import { NewUserInterface } from "@/utils/interfaces";
import { createUser, verifyIfEmailExists } from "@/utils/requests";
import {
  Card,
  Typography,
  CardHeader,
  CardBody,
  Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Sign_up() {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<NewUserInterface>({
    defaultValues: {
      email: "",
      fullname: "",
      password: "",
      phone: "",
      repeatPassword: "",
      username: "",
    },
  });
  const password = watch("password");
  const router = useRouter();
  const onSubmit: SubmitHandler<NewUserInterface> = async ({
    repeatPassword,
    phone,
    ...rest
  }) => {
    let okphone;
    phone === "" ? (okphone = null) : (okphone = phone);
    const user = { phone: okphone as string, ...rest };
    try {
      const res = await createUser(user);
      console.log(res.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
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
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {/**Fullname */}
          <Controller
            rules={{
              required: { value: true, message: "This field is required!" },
              minLength: {
                value: 10,
                message: "The minLength must be 10 characteres.",
              },
              maxLength: {
                value: 60,
                message: "The maxLength must be 60 characteres.",
              },
            }}
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input
                autoFocus={true}
                error={!!errors.fullname}
                type="text"
                crossOrigin={"true"}
                label="Full Name"
                size="lg"
                {...field}
              />
            )}
          />
          {errors.fullname && (
            <InvalidInputMessage message={errors.fullname.message} />
          )}
          {/**username */}
          <Controller
            rules={{
              required: { value: true, message: "This field is required!" },
              minLength: {
                value: 2,
                message: "The minLength must be 2 characteres.",
              },
              maxLength: {
                value: 20,
                message: "The maxLength must be 20 characteres.",
              },
            }}
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                error={!!errors.username}
                type="text"
                crossOrigin={"true"}
                label="Username"
                size="lg"
                {...field}
              />
            )}
          />
          {errors.username && (
            <InvalidInputMessage message={errors.username.message} />
          )}

          {/**Email */}
          <Controller
            rules={{
              required: { value: true, message: "This field is required!" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid format email!",
              },
              validate: async (value) => {
                try {
                  const { data } = await verifyIfEmailExists(value);
                  return data.success || data.message;
                } catch (error) {
                  console.log(error);
                }
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

          {/**Phone */}
          <Controller
            rules={{
              pattern: {
                value:
                  /^(\+\d{1,3}\s?)?(\d{1,4}[\s-]?)?(\(\d{1,4}\))?[0-9\s-]{7,}$/,
                message: "Invalid format phone!",
              },
            }}
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                error={!!errors.phone}
                type="text"
                crossOrigin={"true"}
                label="Phone (optional)"
                size="lg"
                {...field}
              />
            )}
          />
          {errors.phone && (
            <InvalidInputMessage message={errors.phone.message} />
          )}

          {/**password */}
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
          {/**repeat password */}
          <Controller
            rules={{
              validate: (value) =>
                value === password || "Passwords do not match!",
            }}
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <Input
                autoComplete="off"
                error={!!errors.password}
                type="password"
                crossOrigin={"true"}
                label="Confirm Password"
                size="lg"
                {...field}
              />
            )}
          />
          {errors.repeatPassword && (
            <InvalidInputMessage message={errors.repeatPassword.message} />
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Do you have an account?
            <Link href="/login">
              <span className="ml-1 font-bold text-blue-gray-800">Sign in</span>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Sign_up;
