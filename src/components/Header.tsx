"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, TvIcon, ListTodo, Lightbulb } from "lucide-react";
import { protestRevolution } from "@/fonts";
import { usePathname } from "next/navigation";
import React, {  } from "react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SearchBar from "./SearchBar";

export default function Header() {
  const pathName = usePathname();
  const { data } = useSession();
  const user = data?.user;
  
  const navigationMenu = [
    {
      href: "/",
      icon: <Home size={14} />,
      label: "Home",
      hoverClass: "group/home",
    },
    {
      href: "/explore",
      icon: <TvIcon size={14} />,
      label: "Explore",
      hoverClass: "group/anime",
    },
    {
      href: "/recommendations",
      icon: <Lightbulb size={14} />,
      label: "Recommendations",
      hoverClass: "group/recommendations",
    },
    {
      href: "/watchlist",
      icon: <ListTodo size={14} />,
      label: "Watchlist",
      hoverClass: "group/watchlist",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-md shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <img src="./logo.png" alt="Logo" className="w-16 rounded-full " />
          <span
            className={`text-2xl font-bold text-pink-600 ${protestRevolution.className}`}
          >
            AnimeVerse
          </span>
        </Link>

        <NavigationMenu className="mr-auto ml-5">
          <NavigationMenuList className="flex gap-1">
            {navigationMenu.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      `relative flex hover:bg-pink-200 items-center gap-1 text-purple-700 hover:text-pink-600 transition-colors duration-300 p-2 text-sm`,
                      item.href.split("/")[1] === pathName.split("/")[1] &&
                        "bg-pink-200 text-pink-600"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <SearchBar />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/account"}>Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/setting"}>Setting</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" className="bg-pink-600 hover:bg-pink-700">
              <Link href={"/signup"}>Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
