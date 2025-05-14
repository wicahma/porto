import { IButtonBigProps } from "@/interface/atoms/button";
import { cn } from "@/utils/helper/cn";
import { m } from "motion/react";
import { FC } from "react";

const ButtonBig: FC<IButtonBigProps> = ({ className, children }) => {
    return (
        <m.button
            className={cn(
                className,
                "text-xl font-semibold px-8 py-5 rounded-full"
            )}
        >
            {children}
        </m.button>
    );
};

export default ButtonBig;
