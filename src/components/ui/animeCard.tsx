import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon, SaveIcon, CheckCircleIcon } from "lucide-react";
import AnimeDetailsModal from "./animeDetailsModel";
import toast from "react-hot-toast";
import { useAnimeStore } from "@/store/anime-store";
import { getWishlistAnime, updateWishlistAnime } from "@/utils/anime";
import { IAnime } from "@/types/anime";

interface AnimeCardProps {
  anime: IAnime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  const [open, setOpen] = useState(false);
  const [animeIds, setAnimeIds] = useState<string[]>([]);
  const { anime: fullAnime, setAnime } = useAnimeStore();

  useEffect(() => {
    const localAnime = getWishlistAnime();
    setAnimeIds(localAnime.map((anime) => anime.id));
  }, []);

  const handleSaveAnime = () => {
    const localAnime = getWishlistAnime();
    const isAnimeSaved = localAnime.some((item) => item.id === anime.id);

    if (isAnimeSaved) {
      const updatedAnime = localAnime.filter((item) => item.id !== anime.id);
      updateWishlistAnime(updatedAnime);
      setAnimeIds(updatedAnime.map((anime) => anime.id));
      toast.success("Removed from wishlist");
    } else {
      const updatedAnime = [...localAnime, anime];
      console.log("updatedAnime", updatedAnime);
      updateWishlistAnime(updatedAnime);
      setAnimeIds(updatedAnime.map((item) => item.id));
      toast.success("Added to wishlist");
    }
  };

  const handleRedirect = async () => {
    try {
      const response = await fetch(`/api/anime/${anime.id}`, {
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
            src={anime.image}
            alt={`${anime.title} poster`}
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

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleSaveAnime();
              }}
              className="bg-white/90 p-3 rounded-full hover:bg-pink-500 hover:text-white"
              aria-label={
                animeIds.includes(anime.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"
              }
            >
              {animeIds.includes(anime.id) ? (
                <CheckCircleIcon size={24} />
              ) : (
                <SaveIcon size={24} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Title and Episode Number */}
      <div className="mt-3 grid grid-cols-4">
        <div className="pr-2 col-span-3">
          <h4
            className="text-base font-semibold text-gray-800 line-clamp-1"
            title={anime.title}
          >
            {anime.title}
          </h4>
        </div>
        <div className="bg-yellow-400 text-yellow-900 text-sm font-medium px-2 py-1 self-end justify-end w-fit rounded-md shadow-sm flex-grow line-clamp-1">
          <span>Ep {anime.episodes}</span>
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

export default AnimeCard;
