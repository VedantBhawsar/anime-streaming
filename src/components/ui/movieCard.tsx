import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import AnimeDetailsModal from "./animeDetailsModel";
import { useAnimeStore } from "@/store/anime-store";
import Link from "next/link";

export interface IMovie {
  id: string;
  title: string;
  image: string;
  releaseDate: string;
}

interface AnimeCardProps {
  movie: IMovie;
}

function MovieCard({ movie }: AnimeCardProps) {
  const [open, setOpen] = useState(false);
  const [animeIds, setAnimeIds] = useState<string[]>([]);
  const { anime: fullAnime, setAnime } = useAnimeStore();

  return (
    <motion.div className="group relative cursor-pointer rounded-lg overflow-hidden">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <div className="bg-gray-200 aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
          <Image
            fill
            src={movie.image}
            alt={`${movie.title} poster`}
            className="object-cover transition-transform group-hover:scale-110 duration-300"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <Link href={`/anime/${movie.id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={async (e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="bg-white/90 p-3 rounded-full hover:bg-purple-500 text-black hover:text-white"
                aria-label="Watch Episode"
              >
                <PlayIcon size={24} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Title and Episode Number */}
      <div className="mt-3 grid grid-cols-4">
        <div className="pr-2 col-span-3">
          <h4
            className="text-base font-semibold text-gray-800 line-clamp-1"
            title={movie.title}
          >
            {movie.title}
          </h4>
        </div>
        <div className="bg-yellow-400 text-yellow-900 text-sm font-medium px-2 py-1 self-end justify-end w-fit rounded-md shadow-sm flex-grow line-clamp-1">
          <span>{movie.releaseDate}</span>
        </div>
      </div>

      {/* Anime Details Modal */}
      <AnimeDetailsModal
        open={open}
        handleCloseModal={() => {
          setAnime(null);
          setOpen(false);
        }}
      />
    </motion.div>
  );
}

export default MovieCard;
