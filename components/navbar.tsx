import React from "react";
import UserButton from "./user-button";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Sign In",
    href: "/sign-in",
  },
  {
    label: "Sign Up",
    href: "/sign-up",
  },
] as const;

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link className="flex items-center space-x-4" href="/">
          <Image src="/logo.jpg" alt="Logo" width={38} height={38} />
          <span className="font-semibold text-2xl">CPC KIIT</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm ml-6">
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
              className="text-foreground/60 hover:text-foreground/80"
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-3">
            <UserButton />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
