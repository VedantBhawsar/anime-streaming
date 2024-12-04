import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, TvIcon, ListTodo, Github } from "lucide-react";
import { protestRevolution } from "@/fonts";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathName = usePathname();
  console.log(pathName.split('/')[1])
  const navigationMenu = [
    {
      href: "/",
      icon: <Home />,
      label: "Home",
      hoverClass: "group/home",
    },
    {
      href: "/anime",
      icon: <TvIcon/>,
      label: "Anime",
      hoverClass: "group/anime",
    },
    {
      href: "/watchlist",
      icon: <ListTodo/>,
      label: "Watchlist",
      hoverClass: "group/watchlist",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <img src="./logo.png" alt="Logo" className="w-16 rounded-full " />
          <span
            className={`text-2xl font-bold text-pink-600 ${protestRevolution.className}`}
          >
            AnimeVerse
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {navigationMenu.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(`relative flex hover:bg-pink-200 items-center gap-2 text-purple-700 hover:text-pink-600 transition-colors duration-300 p-2 px-3 `, 
                      item.href.split('/')[1] === pathName.split('/')[1] && "bg-pink-200 text-pink-600"

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
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="default" className="bg-pink-600 hover:bg-pink-700">
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
