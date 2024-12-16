"use client";
import { useAnimeStore } from "@/store/anime-store";
import { IAnime } from "@/types/anime";
import { motion } from "framer-motion";

interface HeroSectionProps {}

export function HeroSection({}: HeroSectionProps) {
  const { anime } = useAnimeStore();
  return (
    <div className="relative h-64 md:h-96 mb-6 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <img
        src={anime?.image}
        alt="Anime Cover"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {anime?.title}
        </motion.h1>
        <p className="text-lg opacity-90">{anime?.japaneseTitle}</p>
      </div>
    </div>
  );
}
