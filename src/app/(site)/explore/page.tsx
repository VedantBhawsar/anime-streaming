"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetGenres } from "@/query/get-genres";
import { useGetGenreData } from "@/query/get-genre-data";
import AnimeCardLoading from "@/components/ui/animeCardLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import AnimeCard from "@/components/ui/animeCard";

export default function ExplorePage() {
  const router = useRouter();
  const { data: genres, isLoading: isGenresLoading } = useGetGenres();
  const searchParams = useSearchParams();
  const genre = searchParams.get("q") || "action";
  const {
    data: genreData,
    refetch,
    isRefetching: isGenreDataFetching,
    isLoading: isGenreDataLoading,
  } = useGetGenreData(genre);

  async function handleGenreChange(value: string) {
    router.push("/explore" + "?" + "q=" + value);
    setTimeout(refetch, 800);
  }

  return (
    <div className="container mx-auto px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">
          Explore - <span className="capitalize">{genre}</span>
        </h2>
        {isGenresLoading ? (
          <Skeleton className="w-24 h-8" />
        ) : (
          <Select
            defaultValue={genre || (genres && genres[0])}
            onValueChange={handleGenreChange}
          >
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder="Genres" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {genres?.map((genre: string) => (
                <SelectItem key={genre} value={genre} className="capitalize">
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-5">
        <AnimatePresence>
          {isGenreDataLoading || isGenreDataFetching
            ? Array(20)
                .fill("")
                .map((_, index) => <AnimeCardLoading key={index} />)
            : genreData?.map((anime: any, index: number) => (
                <motion.div
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.3 },
                  }}
                  key={index}
                >
                  <AnimeCard anime={anime}   />
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
