"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Github } from "lucide-react";
import { ReactNode } from "react";
import Header from "@/components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100">
      <Header />
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto grid grid-cols-3 gap-8 p-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-4">
              AnimeVerse
            </h3>
            <p className="text-gray-600">
              Your ultimate destination for anime discoveries and
              recommendations.
            </p>
          </div>

          {/* Column 2 */}
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
              <Button variant="outline" size="icon">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-4 bg-gray-100 text-gray-600">
          © {new Date().getFullYear()} AnimeVerse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
