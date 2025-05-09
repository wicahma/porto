import { ReactNode } from "react";

export interface IContainerProps {
    left: ReactNode;
    right: ReactNode;
    classNameLeft?: string;
    classNameRight?: string;
}
