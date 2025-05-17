import { ReactNode } from "react";

export interface IContainerProps {
    left: ReactNode;
    right: ReactNode;
    className?: string;
    classNameLeft?: string;
    classNameRight?: string;
}
