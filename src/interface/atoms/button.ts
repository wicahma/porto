import { HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

export interface IButtonBigProps extends HTMLMotionProps<"button"> {
  children?: ReactNode;
  className?: string;
}
