"use client";
import { IContainerProps } from "@/interface/organisms/container";
import { cn } from "@/utils/helper/cn";
import { FC } from "react";
import Breadcrumb from "../molecules/header/Breadcrumb";
import Infographic from "../molecules/header/Infograpnic";
import { useNavigationStore } from "@/store/navigationStore";
import { m, AnimatePresence } from "motion/react";
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
          "flex gap-20 container flex-nowrap shrink-0 mx-auto w-full relative",
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
              className={cn("w-1/2 pr-10", classNameLeft)}
            >
              {left}
            </m.div>
          )}
        </AnimatePresence>

        <m.div
          animate={{
            right: detailPage ? "50%" : "0%",
            paddingRight: detailPage ? "2.5rem" : "0rem",
            paddingLeft: detailPage ? "0rem" : "2.5rem",
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className={cn("overflow-hidden w-1/2 absolute", classNameRight)}
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
                "overflow-hidden absolute w-1/2 pl-10",
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
