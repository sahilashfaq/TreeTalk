// hooks/useAuth.ts
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const loadUserFromStorage = useAuthStore(
    (state) => state.loadUserFromStorage
  );
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!user) loadUserFromStorage();
  }, []);

  return {
    user,
    setUser,
    logout,
    isAdmin: user?.role === "Admin",
    isProvider: user?.role === "Doctor",
    isCustomer: user?.role === "Patient",
  };
};
