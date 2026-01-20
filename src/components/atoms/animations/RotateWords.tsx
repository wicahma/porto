"use client";
import * as React from "react";
import { AnimatePresence, m } from "framer-motion";
import { IRotateWordsProps } from "@/interface/atoms/text";

export const RotateWords: React.FC<IRotateWordsProps> = ({
    text = "Rotate",
    words = ["Word 1", "Word 2", "Word 3"],
}) => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
            {text}{" "}
            <AnimatePresence mode="wait">
                <m.p
                    key={words[index]}
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.5 }}
                >
                    {words[index]}
                </m.p>
            </AnimatePresence>
        </div>
    );
};
