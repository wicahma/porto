import { IContainerProps } from "@/interface/organisms/container";
import { cn } from "@/utils/helper/cn";
import React, { FC } from "react";

const Container: FC<IContainerProps> = ({
    left,
    right,
    classNameLeft,
    classNameRight,
}) => {
    return (
        <div className="flex gap-3 container">
            <div className={cn("max-w-[570px] w-full shrink", classNameLeft)}>
                {left}
            </div>
            <div className={cn(classNameRight)}>{right}</div>
        </div>
    );
};

export default Container;
