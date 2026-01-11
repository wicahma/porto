"use client";

import { useLoadingStore } from "@/store/loadingStore";
import { useEffect } from "react";

export function usePageLoading() {
  const {
    startLoading,
    stopLoading,
    setRandomMessage,
    setProgress,
    resetProgress,
  } = useLoadingStore();

  useEffect(() => {
    setRandomMessage();
    resetProgress();
    startLoading();

    const randomDelay = Math.random() * 1500;
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
  }, [startLoading, stopLoading, setRandomMessage, setProgress, resetProgress]);
}
