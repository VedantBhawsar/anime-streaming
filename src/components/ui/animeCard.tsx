import { motion } from "framer-motion";
import Image from "next/image";

interface AnimeCardProps {
  anime: any;
  handleAnimeSelect: (anime: any) => void;
}

function AnimeCard({ anime, handleAnimeSelect }: AnimeCardProps) {
  return (
    <motion.div
      key={anime.id}
      className="p-2 group relative cursor-pointer"
      onClick={() => handleAnimeSelect(anime)}
    >
      <div className="relative w-full h-80 rounded-lg overflow-hidden group">
        <Image
          src={anime.image}
          alt={anime.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-white text-5xl"
          >
            ▶
          </motion.div>
        </div>

        <motion.div className="flex flex-col group-hover:hidden transition-colors duration-300 absolute bottom-0 left-0 w-full px-4 py-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
          <p className="text-white text-sm truncate font-semibold mb-1">
            {anime.title}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-white text-xs opacity-80 truncate">Anime</p>
            <p className="text-white font-bold text-sm truncate">
              0
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AnimeCard;