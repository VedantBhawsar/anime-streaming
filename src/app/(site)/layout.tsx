import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 ">{children}</main>
      <Footer />
    </div>
  );
}
