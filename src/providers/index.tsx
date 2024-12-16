"use client";
import { ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { isModuleNamespaceObject } from "util/types";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
interface IProviders {
  children: ReactNode;
}

export default function Providers({ children }: IProviders) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SessionProvider>
        <QueryProvider>
          <TooltipProvider>
            <NextTopLoader color="#f472b6" />
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </TooltipProvider>
        </QueryProvider>
      </SessionProvider>
    </>
  );
}
