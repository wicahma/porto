import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inp: ClassValue[]) => twMerge(clsx(inp));
