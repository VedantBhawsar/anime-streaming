"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Loading() {
  return (
    <section className="h-screen w-screen flex justify-center items-center bg-gradient-to-br  from-pink-50 to-purple-100 backdrop-blur absolute">
      <div>
        <Image
          src={"/logo.png"}
          alt="loading-logo"
          height={110}
          width={110}
          className="animate-spin"
        />
      </div>
    </section>
  );
}
