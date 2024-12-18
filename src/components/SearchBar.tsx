"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import Image from "next/image";
import { api } from "@/lib/api";
import { ScrollArea } from "./ui/scroll-area";

interface IAnime {
  id: string;
  title: string;
  url: string;
  image: string;
  duration: string;
  japaneseTitle: string;
  type: string;
  nsfw: boolean;
  sub: number;
  dub: number;
  episodes: number;
}

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [animeData, setAnimeData] = useState<IAnime[]>([]);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  useEffect(() => {
    function fetchSearch() {
      if (query.trim().length > 3) {
        api
          .get("/anime/search" + "?q=" + query)
          .then((response) => setAnimeData(response.data.results))
          .catch((error) => {
            console.log(error);
          });
      }
    }
    const fetchTimeout = setTimeout(fetchSearch, 300);
    return () => clearTimeout(fetchTimeout);
  }, [query]);

  return (
    <div className="relative w-96 flex justify-end">
      <Input
        ref={inputRef}
        placeholder="Search for anime..."
        className="w-60 focus:w-96 transition-all text-gray-400 focus:text-black duration-200 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isFocused && (
        <motion.div
          initial={{
            y: 10,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.2,
            delay: 0.1,
          }}
          className="absolute w-full mt-10 h-96 overflow-scroll bg-white shadow-lg rounded-md"
        >
          <ScrollArea>
            {animeData?.length < 1 ? (
              <div>
                <p>no result found</p>
              </div>
            ) : (
              animeData?.map((anime) => (
                <Link
                  key={anime.id}
                  href={`/anime/${anime.id}`}
                  className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="col-span-1 w-full relative h-24 rounded-md overflow-hidden">
                    <Image
                      src={anime?.image}
                      alt={anime?.title}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-3">
                    <h3 className="text-base font-medium">{anime?.title}</h3>
                    <p className="text-xs text-gray-500">
                      durations: {anime?.duration}
                    </p>
                    <p className="text-xs text-gray-500">
                      episodes: {anime?.sub}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </ScrollArea>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
