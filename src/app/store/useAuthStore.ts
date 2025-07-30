// stores/useAuthStore.ts
import { create } from "zustand";

export type User = {
  id: number;
  username: string;
  email: string;
  role: "Admin" | "Service Provider" | "Customer";
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  loadUserFromStorage: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
    set({ user });
  },

  loadUserFromStorage: () => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        set({ user: parsed });
      } catch {
        set({ user: null });
      }
    }
  },

  logout: () => {
    localStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; Max-Age=0; path=/;`;
    });
    set({ user: null });
  },
}));
