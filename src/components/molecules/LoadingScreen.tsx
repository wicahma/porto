"use client";

import { useLoadingStore } from "@/store/loadingStore";
import { AnimatePresence, m } from "motion/react";

export default function LoadingScreen() {
  const { isLoading, message, progress } = useLoadingStore();

  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/5 backdrop-blur-xl"
        >
          <div className="text-center space-y-6 px-4 max-w-xl w-full">
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <m.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Percentage */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Loading...</span>
                <span className="text-white font-mono font-bold text-lg">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Loading Message */}
            <m.p
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-gray-300 text-base font-medium"
            >
              {message}
            </m.p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
