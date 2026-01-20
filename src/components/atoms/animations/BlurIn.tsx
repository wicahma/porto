"use client";
import { m, useInView } from "framer-motion";
import * as React from "react";

export const BlurIn = ({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay: number;
}) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <m.div
            ref={ref}
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
            transition={{ duration: 1.2, delay }}
        >
            {children}
        </m.div>
    );
};
