import { ReactNode } from "react";

export interface IContainerProps {
  left: ReactNode;
  right: ReactNode;
  detail?: ReactNode;
  className?: string;
  classNameLeft?: string;
  classNameRight?: string;
  classNameDetail?: string;
  isInitialLoad?: boolean;
}
