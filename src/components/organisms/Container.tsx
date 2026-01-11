"use client";
import { IContainerProps } from "@/interface/organisms/container";
import { cn } from "@/utils/helper/cn";
import { FC } from "react";
import Breadcrumb from "../molecules/header/Breadcrumb";
import Infographic from "../molecules/header/Infograpnic";
import { useNavigationStore } from "@/store/navigationStore";
import RenderIf from "@/utils/helper/render-if";
import { m } from "motion/react";
import { useLoadingStore } from "@/store/loadingStore";

const Container: FC<IContainerProps> = ({
  left,
  right,
  detail,
  className,
  classNameLeft,
  classNameRight,
  classNameDetail,
}) => {
  const detailPage = useNavigationStore((state) => state.detailPage);
  const { isLoading } = useLoadingStore((state) => state);

  return (
    <m.div
      initial={{ display: "none", opacity: 0 }}
      animate={
        isLoading
          ? { display: "none", opacity: 0 }
          : { display: "block", opacity: 1 }
      }
      exit={{ opacity: 0 }}
    >
      <div
        className={cn(
          className,
          "flex gap-20 container flex-nowrap shrink-0 mx-auto w-full items-center"
        )}
      >
        <Breadcrumb />
        <Infographic />
      </div>
      <div
        className={cn(
          "flex gap-20 container flex-nowrap shrink-0 mx-auto w-full",
          className
        )}
      >
        <RenderIf condition={!detailPage}>
          <div className={cn("w-1/2", classNameLeft)}>
            <div>{left}</div>
          </div>
        </RenderIf>
        <div className={cn("w-1/2", classNameRight)}>
          <div>{right}</div>
        </div>
        <RenderIf condition={!!detailPage}>
          <div className={cn("w-1/2", classNameDetail)}>{detail}</div>
        </RenderIf>
      </div>
    </m.div>
  );
};

export default Container;
