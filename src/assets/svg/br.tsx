import { cn } from "@/utils/helper/cn";
import { HTMLMotionProps, m } from "motion/react";

export default function Br(props: HTMLMotionProps<"div">) {
  return (
    <m.div
      {...props}
      className={cn(
        "h-0.5 grow bg-neutral-800 w-full rounded-2xl",
        props.className
      )}
    />
  );
}
