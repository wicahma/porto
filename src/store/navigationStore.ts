import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreValue {
  detailPage: "article" | "project" | "experience" | null;
}

interface StoreState {
  setPage: (page: StoreValue["detailPage"]) => void;
  reset: () => void;
}

export const values: StoreValue = {
  detailPage: null,
};

export const useNavigationStore = create<StoreState & StoreValue>()(
  persist(
    (set) => ({
      ...values,
      setPage: (page) => set({ detailPage: page }),
      reset: () => set(values),
    }),
    { name: "navigation-storage" }
  )
);
