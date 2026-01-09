import { IContainerProps } from "@/interface/organisms/container";
import { cn } from "@/utils/helper/cn";
import { FC } from "react";
import Breadcrumb from "../molecules/header/Breadcrumb";
import Infographic from "../molecules/header/Infograpnic";

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
        "flex gap-10 container flex-nowrap shrink-0 mx-auto",
        className
      )}
    >
      <div className={cn("w-full shrink", classNameLeft)}>
        <Breadcrumb />
        {left}
      </div>
      <div className="w-full">
        <Infographic />
        <div className={classNameRight}>{right}</div>
      </div>
    </div>
  );
};

export default Container;
