import { cn } from "@/lib/utils";
import React from "react";
import {CardDemo} from "./cardMenu";

export default function GridBackgroundDemo() {
  return (
    <div className="relative flex min-h-[80rem] w-full items-center justify-center bg-white py-20 dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className=" relative z-20 pb-12  flex w-full flex-col items-center gap-12">
        <h2 className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl ">
          Today’s Research Topics
        </h2>
        <CardDemo/>
      </div>
    </div>
  );
}


