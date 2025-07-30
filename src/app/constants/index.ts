import { CalendarDays, Users, LayoutDashboardIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const MENU = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Providers",
    path: "/service-providers",
    icon: Users,
  },
  {
    title: "Bookings",
    path: "/bookings",
    icon: CalendarDays,
  },
];

export const ROUTES = {
  DASHBOARD: "/dashboard",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  HOME: "/home",
  SHOP: "/shop",
};
