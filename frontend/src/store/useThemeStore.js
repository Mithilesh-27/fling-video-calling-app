import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("fling-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("fling-theme", theme);
    set({ theme });
  },
}));