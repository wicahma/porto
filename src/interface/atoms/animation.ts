import { direction } from "./text";

export interface IFadeProps {
    direction?: direction;
    children: React.ReactNode;
    delay?: number;
    className?: string;
    staggerChildren?: number;
}

export interface IStaggerProps {
    direction?: direction;
    children: React.ReactNode;
    delay?: number;
    className?: string;
    staggerChildren?: number;
}
