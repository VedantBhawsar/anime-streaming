"use client";
import { ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { isModuleNamespaceObject } from "util/types";
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
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
