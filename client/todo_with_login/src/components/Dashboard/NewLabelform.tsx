"use client";
import { IconButton, Input, Spinner } from "@material-tailwind/react";
import { BiSolidRightArrow } from "react-icons/bi";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InvalidInputMessage from "../InvalidInputMessage";
import { useEffect, useState } from "react";
import { createProject, verifyProjectCreation } from "@/utils/requestsProjects";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  AuthContextInterface,
  DashboardContextInterface,
} from "@/utils/interfaces";
import { createLabel, verifyLabelCreation } from "@/utils/requestsLabels";
import { useDashboardContext } from "@/hooks/useDashboardContext";
import { selectLabel } from "@/utils/auxiliarFunctions";

function NewLabelform({ open, type }: { open: boolean; type: "l" | "p" }) {
  const [isLoading, setIsLoading] = useState(false);

  const { csrfToken } = useAuthContext() as AuthContextInterface;

  const {
    addOrUpdLabel,
    addOrUpdProject,
    setRefreshLabels,
    setRefreshProjects,
  } = useDashboardContext() as DashboardContextInterface;

  const label = selectLabel(
    type,
    type === "l" ? addOrUpdLabel.action : addOrUpdProject.action
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>({ defaultValues: { title: "" } });

  const onSubmit: SubmitHandler<{ title: string }> = async ({ title }) => {
    try {
      let res;
      setIsLoading(true);

      if (type === "p") {
        res = await createProject(csrfToken as string, { title });
        setRefreshProjects((prev) => prev + 1);
      } else {
        res = await createLabel(csrfToken as string, { title });
        setRefreshLabels((prev) => prev + 1);
      }

      console.log(res);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    !open && reset();
  }, [open]);

  return (
    <form
      className="flex flex-col gap-2 mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex">
        <Controller
          name="title"
          control={control}
          rules={{
            required: { value: true, message: "This field is required" },
            minLength: {
              value: type === "p" ? 10 : 3,
              message: `The minLength must be ${
                type === "p" ? 10 : 3
              } characteres.`,
            },
            maxLength: {
              value: type === "p" ? 40 : 20,
              message: `The maxLength must be ${
                type === "p" ? 40 : 20
              } characteres.`,
            },
            validate: async (value) => {
              try {
                let data;
                setIsLoading(true);
                if (type === "p") {
                  data = await verifyProjectCreation(
                    { title: value },
                    csrfToken as string
                  );
                } else
                  data = await verifyLabelCreation(
                    { title: value },
                    csrfToken as string
                  );
                return data.success || data.message;
              } catch (error) {
                console.log(error);
              } finally {
                setIsLoading(false);
              }
            },
          }}
          render={({ field }) => (
            <Input
              label={label}
              className=""
              error={!!errors.title}
              crossOrigin={"true"}
              type="text"
              {...field}
            />
          )}
        />
        <IconButton disabled={!!errors.title} type="submit" variant="text">
          {isLoading ? (
            <Spinner color="purple" className="h-5 w-5" />
          ) : (
            <BiSolidRightArrow className="h-5 w-5 fill-cusLigthViolet" />
          )}
        </IconButton>
      </div>
      {errors.title && <InvalidInputMessage message={errors.title.message} />}
    </form>
  );
}

export default NewLabelform;
