"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact us",
    path: "/contact-us",
  },
];
function Header() {
  const { user } = useUser();
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md relative">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} className="w-6 h-6 sm:w-8 sm:h-8" />
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl">Travel Planner</h2>
      </div>

      {/* Menu Options */}
      <div className="hidden lg:flex gap-4 xl:gap-8 items-center">
        {menuOptions.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2 className="text-sm xl:text-lg hover:scale-105 transition-all hover:text-primary">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </div>
      </button>

      {/* Get Started Button */}
      <div className="hidden lg:flex items-center gap-3 xl:gap-5">
        {!user ? (
          <SignInButton mode="modal">
            <Button className="text-sm xl:text-base px-3 xl:px-4">Get Started</Button>
          </SignInButton>
        ) : path == "/create-new-trip" ? (
          <Link href="/my-trips">
            <Button className="text-sm xl:text-base px-3 xl:px-4">My Trips</Button>
          </Link>
        ) : (
          <Link href="/create-new-trip">
            <Button className="text-sm xl:text-base px-3 xl:px-4">Create New Trip</Button>
          </Link>
        )}
        <UserButton />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t lg:hidden z-50">
          <div className="flex flex-col p-4 space-y-4">
            {menuOptions.map((menu, index) => (
              <Link key={index} href={menu.path} onClick={() => setIsMobileMenuOpen(false)}>
                <h2 className="text-lg hover:text-primary transition-colors py-2">
                  {menu.name}
                </h2>
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t">
              {!user ? (
                <SignInButton mode="modal">
                  <Button className="w-full">Get Started</Button>
                </SignInButton>
              ) : path == "/create-new-trip" ? (
                <Link href="/my-trips">
                  <Button className="w-full">My Trips</Button>
                </Link>
              ) : (
                <Link href="/create-new-trip">
                  <Button className="w-full">Create New Trip</Button>
                </Link>
              )}
              <div className="flex justify-center">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
