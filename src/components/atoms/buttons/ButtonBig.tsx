import { IButtonBigProps } from "@/interface/atoms/button";
import { cn } from "@/utils/helper/cn";
import { m } from "motion/react";
import { FC } from "react";

const ButtonBig: FC<IButtonBigProps> = ({ className, children, ...props }) => {
  return (
    <m.button
      {...props}
      initial={{ ...(props?.initial as any), opacity: 0, y: 20, scale: 0.95 }}
      animate={{ ...(props?.animate as any), opacity: 1, y: 0, scale: 1 }}
      className={cn(
        className,
        "md:text-xl text-md text-nowrap whitespace-nowrap cursor-pointer font-semibold md:px-8 md:py-5 px-5 py-3 rounded-full"
      )}
    >
      {children}
    </m.button>
  );
};

export default ButtonBig;
