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

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-md shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <img
            src="./logo.png"
            alt="Logo"
            className="w-16 rounded-full "
          />
          <span
            className={`text-2xl font-bold text-pink-600 ${protestRevolution.className}`}
          >
            AnimeVerse
          </span>
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="relative flex items-center gap-2 text-purple-700 hover:text-pink-600 transition-colors duration-300 group/home p-2 px-3 "
                >
                  <Home className="h-4 w-4" />
                  Home
                  <span className="absolute left-0 top-0 h-full w-full bg-purple-400/10 scale-x-0 group-hover/home:scale-x-100 origin-left transition-transform duration-300 pointer-events-none rounded-xl border-2 border-purple-300" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/anime"
                  className="relative flex items-center gap-2 text-purple-700 hover:text-pink-600 transition-colors duration-300 group/anime p-2 px-3 "
                >
                  <TvIcon className="h-4 w-4" />
                  Anime
                  <span className="absolute left-0 top-0 h-full w-full bg-purple-400/10 scale-x-0 group-hover/anime:scale-x-100 origin-left transition-transform duration-300 pointer-events-none rounded-xl border-2 border-purple-300" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/watchlist"
                  className="relative flex items-center gap-2 text-purple-700 hover:text-pink-600 transition-colors duration-300 group/watchlist p-2 px-3 "
                >
                  <ListTodo className="h-4 w-4" />
                  Watchlist
                  <span className="absolute left-0 top-0 h-full w-full bg-purple-400/10 scale-x-0 group-hover/watchlist:scale-x-100 origin-left transition-transform duration-300 pointer-events-none rounded-xl border-2 border-purple-300" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
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
