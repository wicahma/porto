/**
 * HTML tags the text animations may render. Deliberately a closed union: the
 * global `keyof JSX.IntrinsicElements` also contains the WebGL elements that
 * `@react-three/fiber` augments the JSX namespace with, and those demand
 * three.js constructor `args` the callers never pass.
 */
export type TextAnimationTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "strong"
  | "em"
  | "li";

export interface ILettersUpProps {
    text: string;
    className?: string;
    direction?: direction;
    tag?: TextAnimationTag;
    delay?: number;
}

export interface IWordsUpProps {
    text: string;
    className?: string;
    direction?: direction;
    delay?: number;
    delayWords?: number;
    tag?: TextAnimationTag;
    textClassName?: string;
}

export interface IRotateWordsProps {
    text: string;
    words: string[];
}

export type direction =
    | "to-left"
    | "to-top"
    | "to-right"
    | "to-bottom"
    | "to-center";
