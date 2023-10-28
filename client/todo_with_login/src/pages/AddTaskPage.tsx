"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { format } from "date-fns";
import {
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Select from "react-select";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContextInterface, TaskFormInterface } from "@/utils/interfaces";
import InvalidInputMessage from "@/components/InvalidInputMessage";
import { useAuthContext } from "@/hooks/useAuthContext";
import { createTask } from "@/utils/requests";
import { defineTask } from "@/utils/auxiliarFunctions";

function AddTaskPage() {
  const { csrfToken } = useAuthContext() as AuthContextInterface;

  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<TaskFormInterface>({
    defaultValues: {
      title: "",
      description: "",
      due_date: "",
      priority: null,
    },
  });
  const onSubmit: SubmitHandler<TaskFormInterface> = async ({
    title,
    description,
    priority,
    due_date,
  }) => {
    const task = defineTask({
      title,
      description,
      due_date,
      priority: priority?.value as string,
    });

    try {
      const res = await createTask(task, csrfToken as string);
      reset();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="flex justify-center items-center mt-16"
      id="formTask"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            New Task
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {/**title */}
          <Controller
            rules={{
              required: { value: true, message: "This field is required" },
              minLength: {
                value: 5,
                message: "The minLength must be 5 characteres.",
              },
              maxLength: {
                value: 40,
                message: "The maxLength must be 40 characteres.",
              },
            }}
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                error={!!errors.title}
                crossOrigin={"true"}
                label="Title"
                {...field}
              />
            )}
          />
          {errors.title && (
            <InvalidInputMessage message={errors.title.message} />
          )}

          {/**Description */}
          <Controller
            rules={{
              maxLength: {
                value: 200,
                message: "The maxLength must be 200 characteres.",
              },
            }}
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                error={!!errors.description}
                label="Description"
                {...field}
              />
            )}
          />
          {errors.description && (
            <InvalidInputMessage message={errors.description.message} />
          )}

          {/**Priority */}
          <Controller
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            name="priority"
            control={control}
            render={({ field }) => (
              <Select
                classNamePrefix={`${errors.priority && "custom-select"}`}
                options={options}
                {...field}
              />
            )}
          />
          {errors.priority && (
            <InvalidInputMessage message={errors.priority.message} />
          )}

          {/**Duedate */}
          <Controller
            rules={{
              required: { value: true, message: "This field is required" },
              validate: (value) => {
                const okdate = value.replace(/-/g, "/");
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                console.log(today);
                const taskDueDate = new Date(okdate);
                console.log(taskDueDate);
                return (
                  taskDueDate >= today ||
                  "The task's duedate must be in the future."
                );
              },
            }}
            name="due_date"
            control={control}
            render={({ field }) => (
              <Datepicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  field.onChange(date && format(date, "yyyy-MM-dd"));
                }}
                value={field.value}
                closeOnScroll={true}
                autoComplete="off"
                minDate={new Date()}
                customInput={
                  <Input
                    {...field}
                    error={!!errors.due_date}
                    className="w-full"
                    crossOrigin={"true"}
                    label="Due date"
                    autoComplete={"off"}
                  />
                }
              />
            )}
          />
          {errors.due_date && (
            <InvalidInputMessage message={errors.due_date.message} />
          )}
        </CardBody>
      </Card>
    </form>
  );
}

export default AddTaskPage;
