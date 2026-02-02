import { create } from "zustand";
import { loadingMessages } from "@/constants/loading";

interface LoadingState {
  isLoading: boolean;
  message: string;
  progress: number;
  startLoading: () => void;
  stopLoading: () => void;
  setRandomMessage: () => void;
  setProgress: (progress: number) => void;
  resetProgress: () => void;
}

const getRandomMessage = () => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  message: getRandomMessage(),
  progress: 0,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setRandomMessage: () => set({ message: getRandomMessage() }),
  setProgress: (progress) => set({ progress }),
  resetProgress: () => set({ progress: 0 }),
}));
