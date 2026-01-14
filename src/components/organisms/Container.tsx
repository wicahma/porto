"use client";
import { IContainerProps } from "@/interface/organisms/container";
import { cn } from "@/utils/helper/cn";
import { FC, useEffect, useMemo } from "react";
import Breadcrumb from "../molecules/header/Breadcrumb";
import Infographic from "../molecules/header/Infograpnic";
import { useNavigationStore } from "@/store/navigationStore";
import { m, AnimatePresence } from "motion/react";
import { useLoadingStore } from "@/store/loadingStore";
import { isMdUp } from "@/utils/helper/responsive";

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
          "flex md:flex-nowrap flex-wrap-reverse md:gap-20 gap-5 container shrink-0 mx-auto w-full items-center md:mb-0 mb-5 md:px-0 px-5"
        )}
      >
        <Breadcrumb />
        <Infographic />
      </div>
      <div
        className={cn(
          "flex gap-20 container md:flex-nowrap md:px-0 px-5 flex-wrap shrink-0 mx-auto w-full relative",
          className
        )}
      >
        <AnimatePresence mode="wait">
          {!detailPage && (
            <m.div
              key="left-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className={cn("md:w-1/2 md:pr-10 w-full", classNameLeft)}
            >
              {left}
            </m.div>
          )}
        </AnimatePresence>

        <m.div
          animate={{
            right: detailPage ? "50%" : "0%",
            ...(isMdUp()
              ? {
                  paddingRight: detailPage ? "2.5rem" : "0rem",
                  paddingLeft: detailPage ? "0rem" : "2.5rem",
                }
              : {}),
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "md:overflow-hidden md:w-1/2 w-full md:absolute",
            classNameRight
          )}
        >
          {right}
        </m.div>

        <AnimatePresence mode="wait">
          {detailPage && (
            <m.div
              key="detail-panel"
              initial={{
                opacity: 0,
                right: "-20%",
                scale: 0.75,
                zIndex: -100,
              }}
              animate={{ opacity: 1, right: "0%", zIndex: 0, scale: 1 }}
              exit={{
                opacity: 0,
                right: "-20%",
                scale: 0.75,
                zIndex: -100,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "overflow-hidden md:absolute md:w-1/2 md:pl-10 w-full",
                classNameDetail
              )}
            >
              {detail}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export default Container;
