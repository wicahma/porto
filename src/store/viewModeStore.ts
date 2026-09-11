import { create } from "zustand";

interface ViewModeState {
  isSimpleMode: boolean;
  toggleViewMode: () => void;
  setViewMode: (isSimple: boolean) => void;
  init: () => void;
}

const STORAGE_KEY = "porto_view_mode_simple";

export const useViewModeStore = create<ViewModeState>((set) => ({
  isSimpleMode: false,
  init: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) === "true";
      set({ isSimpleMode: stored });
    }
  },
  toggleViewMode: () =>
    set((state) => {
      const next = !state.isSimpleMode;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, String(next));
      }
      return { isSimpleMode: next };
    }),
  setViewMode: (isSimple: boolean) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(isSimple));
    }
    set({ isSimpleMode: isSimple });
  },
}));
