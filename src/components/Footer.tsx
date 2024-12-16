import Link from "next/link";

import { Button } from "./ui/button";
import { Star, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto grid grid-cols-3 gap-8 p-8">
        <div>
          <h3 className="text-xl font-bold text-purple-700 mb-4">AnimeVerse</h3>
          <p className="text-gray-600">
            Your ultimate destination for anime discoveries and recommendations.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-pink-600 mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-gray-700 hover:text-purple-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-purple-600"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-gray-700 hover:text-purple-600"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold text-pink-600 mb-4">Connect</h4>
          <div className="flex gap-4">
            <Link href={"/"} className="group">
              <Button variant="outline" size="icon">
                <Star className="h-4 w-4 group-hover:text-yellow-600 font-bold" />
              </Button>
            </Link>
            <Link href={"/"} className="">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4 " />
              </Button>
            </Link>
            <Link href={"/"} className="group">
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4 group-hover:text-blue-500 font-bold" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 bg-gray-100 text-gray-600">
        © {new Date().getFullYear()} AnimeVerse. All rights reserved.
      </div>
    </footer>
  );
}
