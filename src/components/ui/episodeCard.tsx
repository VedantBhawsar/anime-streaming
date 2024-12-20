import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import AnimeDetailsModal from "./animeDetailsModel";
import { useAnimeStore } from "@/store/anime-store";
import { getWishlistAnime } from "@/utils/anime";
import { IEpisodes } from "./animeCarousel";

interface AnimeCardProps {
  episode: IEpisodes;
}

function EpisodeCard({ episode }: AnimeCardProps) {
  const [open, setOpen] = useState(false);
  const [animeIds, setAnimeIds] = useState<string[]>([]);
  const { anime: fullAnime, setAnime } = useAnimeStore();

  useEffect(() => {
    const localAnime = getWishlistAnime();
    setAnimeIds(localAnime.map((anime) => episode.id));
  }, []);

  const handleRedirect = async () => {
    try {
      const response = await fetch(`/api/anime/${episode.id}`, {
        cache: "no-cache",
      });
      const data = await response.json();

      setAnime(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <motion.div className="group relative cursor-pointer rounded-lg overflow-hidden">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <div className="bg-gray-200 aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
          <Image
            fill
            src={episode.image}
            alt={`${episode.title} poster`}
            className="object-cover transition-transform group-hover:scale-110 duration-300"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={async (e) => {
                e.stopPropagation();
                handleRedirect();
                setOpen(true);
              }}
              className="bg-white/90 p-3 rounded-full hover:bg-purple-500 text-black hover:text-white"
              aria-label="Watch Episode"
            >
              <PlayIcon size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Title and Episode Number */}
      <div className="mt-3 grid grid-cols-4">
        <div className="pr-2 col-span-3">
          <h4
            className="text-base font-semibold text-gray-800 line-clamp-1"
            title={episode.title}
          >
            {episode.title}
          </h4>
        </div>
        <div className="bg-yellow-400 text-yellow-900 text-sm font-medium px-2 py-1 self-end justify-end w-fit rounded-md shadow-sm flex-grow line-clamp-1">
          <span>Ep {episode.episodeNumber}</span>
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

export default EpisodeCard;
