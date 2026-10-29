"use client";

import { useLoadingStore } from "@/store/loadingStore";
import { isMdUp } from "@/utils/helper/responsive";
import { useEffect } from "react";

export function usePageLoading() {
  const startLoading = useLoadingStore((s) => s.startLoading);
  const stopLoading = useLoadingStore((s) => s.stopLoading);
  const setRandomMessage = useLoadingStore((s) => s.setRandomMessage);
  const setProgress = useLoadingStore((s) => s.setProgress);
  const resetProgress = useLoadingStore((s) => s.resetProgress);

  useEffect(() => {
    setRandomMessage();
    resetProgress();
    startLoading();

    const randomDelay = isMdUp() ? Math.random() * 1500 : Math.random() * 3000;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / randomDelay) * 100, 100);
      setProgress(Math.floor(progress));

      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        stopLoading();
      }, 200);
    }, randomDelay);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);
}
