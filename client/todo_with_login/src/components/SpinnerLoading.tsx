"use client";
import { Spinner } from "@material-tailwind/react";

function SpinnerLoading({ size }: { size: number }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner className={`h-${size} w-${size}`} />
    </div>
  );
}

export default SpinnerLoading;
