"use client";

import { m } from "motion/react";
import React, { useEffect, useState } from "react";

interface LoaderProps {
  readonly isLoading: boolean;
}

export const ThreeDLoader: React.FC<LoaderProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <m.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30"
    >
      <div className="w-32 h-32 flex items-center justify-center flex-col">
        <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <m.div
            className="absolute top-0 left-0 h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-white mt-2 text-xs">
          {Math.round(progress)}% Loaded
        </p>
      </div>
    </m.div>
  );
};
