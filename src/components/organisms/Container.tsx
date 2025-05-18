import { IContainerProps } from "@/interface/organisms/container";
import { cn } from "@/utils/helper/cn";
import React, { FC } from "react";

const Container: FC<IContainerProps> = ({
    left,
    right,
    className,
    classNameLeft,
    classNameRight,
}) => {
    return (
        <div
            className={cn(
                "flex gap-3 container flex-nowrap shrink-0",
                className
            )}
        >
            <div className={cn("max-w-[570px] w-full shrink", classNameLeft)}>
                {left}
            </div>
            <div className={cn(classNameRight)}>{right}</div>
        </div>
    );
};

export default Container;
