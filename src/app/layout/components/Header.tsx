"use client";

import { useRouter } from "next/navigation";
import { MENU, ROUTES } from "@/app/constants";
import { Menu } from "lucide-react";
import Button from "@/app/components/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";
import Typography from "@/app/components/Typography";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      {/* Brand / Title */}
      <Image src={"/images/logo.png"} width={110} height={110} alt="Logo" />

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {MENU.filter((item) => {
          if (user?.role === "Service Provider" && item.title === "Providers") {
            return false;
          }
          return true;
        }).map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.path}
              className="flex items-center cursor-pointer hover:text-[#ff5d2e] gap-1"
              onClick={() => router.push(item.path)}
            >
              <Icon size={18} />
              <span className="font-medium">{item.title}</span>
            </div>
          );
        })}
      </nav>

      {/* Desktop Action Buttons */}
      <div className="hidden md:flex items-center gap-2">
        {user ? (
          <>
            <Typography variant="h4">{user?.username} |</Typography>
            <Typography variant="h4">{user?.role}</Typography>
            <Button variant="default" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="default" onClick={() => router.push(ROUTES.SIGN_IN)}>
            Sign In
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 text-black">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-4">
            <Image
              className="flex items-center"
              src={"/images/logo.png"}
              width={110}
              height={110}
              alt="Logo"
            />

            {user && (
              <Typography variant="h4" className="text-center">
                {user.username} | {user.role}
              </Typography>
            )}

            <div className="flex flex-col gap-4 mt-4">
              {MENU.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.path}
                    className="flex items-center gap-2 text-gray-800 cursor-pointer"
                    onClick={() => router.push(item.path)}
                  >
                    <Icon size={18} />
                    <span>{item.title}</span>
                  </div>
                );
              })}

              <hr className="my-3" />

              {!user ? (
                <Button
                  variant="default"
                  onClick={() => router.push(ROUTES.SIGN_IN)}
                >
                  Sign In
                </Button>
              ) : (
                <Button variant="default" onClick={logout}>
                  Logout
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
