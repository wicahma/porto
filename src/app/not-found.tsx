"use client";
import NotFoundWaterAnimation from "@/components/molecules/loaders-notfound/NotFoundWaterAnimation";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
export default function NotFound() {
  return (
    <AnimatePresence mode="wait">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xl z-9999"
      >
        <div className="absolute inset-0 overflow-hidden">
          <NotFoundWaterAnimation />
        </div>
        <div className="relative z-10 text-center space-y-2 px-4 max-w-xl w-full">
          <div>
            <span className="text-white font-mono font-bold text-4xl drop-shadow-lg">
              How did you end here?
            </span>
          </div>
          <Link
            href="/"
            className="transition-colors hover:underline hover:text-sky-700"
          >
            go to home.
          </Link>
        </div>
      </m.div>
    </AnimatePresence>
  );
}
