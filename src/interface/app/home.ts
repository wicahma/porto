import { Easing, Transition } from "motion";
import { FC, SVGProps } from "react";

export interface IHomeDecoration {
    Comp: FC<SVGProps<SVGSVGElement>>;
    x: number | number[];
    y: number | number[];
    ease?: Transition["ease"];
    duration?: number;
    r?: number;
    rt?: number;
    s?: number;
}
