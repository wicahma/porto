import { JSX } from "react";

export interface ILettersUpProps {
    text: string;
    className?: string;
    direction?: direction;
    tag?: keyof JSX.IntrinsicElements;
    delay?: number;
}

export interface IWordsUpProps {
    text: string;
    className?: string;
    direction?: direction;
    delay?: number;
    delayWords?: number;
    tag?: keyof JSX.IntrinsicElements;
    textClassName?: string;
}

export interface IRotateWordsProps {
    text: string;
    words: string[];
}

export type direction = "to-left" | "to-top" | "to-right" | "to-bottom";
