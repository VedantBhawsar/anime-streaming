"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <section className="fixed flex-col w-full h-full  flex items-center justify-center bg-gradient-to-br from-background-light to-background-dark backdrop-blur-md z-50">
      <motion.div
        initial={{
          scale: 1.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: 'linear'
        }}
        className="flex items-center justify-center flex-col inset-0"
      >
        <Image
          src="/logo.png"
          alt="loading-logo"
          height={110}
          width={110}
          className="md:h-20 sm:h-16 object-cover"
          priority
        />
        <p className="dark:text-gray-300 text-gray-500">Loading...</p>
      </motion.div>
    </section>
  );
}
