"use client";
import { IContainerProps } from "@/interface/organisms/container";
import { useLoadingStore } from "@/store/loadingStore";
import { cn } from "@/utils/helper/cn";
import { isMdUp } from "@/utils/helper/responsive";
import { AnimatePresence, m } from "motion/react";
import { FC } from "react";
import Breadcrumb from "../molecules/header/Breadcrumb";
import Infographic from "../molecules/header/Infograpnic";
import { usePathname } from "next/navigation";

const Container: FC<IContainerProps> = ({
  left,
  right,
  detail,
  className,
  classNameLeft,
  classNameRight,
  classNameDetail,
  isInitialLoad = false,
}) => {
  const pathname = usePathname();
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
          {pathname === "/" && (
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
            right: pathname !== "/" ? "50%" : "0%",
            ...(isMdUp()
              ? {
                  paddingRight: pathname !== "/" ? "2.5rem" : "0rem",
                  paddingLeft: pathname !== "/" ? "0rem" : "2.5rem",
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
          {pathname !== "/" && (
            <m.div
              key="detail-panel"
              initial={
                isInitialLoad
                  ? false
                  : {
                      opacity: 0,
                      right: "-20%",
                      scale: 0.75,
                      zIndex: -100,
                    }
              }
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
