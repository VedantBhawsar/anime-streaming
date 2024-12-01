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
      className=" p-2 flex-shrink-0 group relative cursor-pointer"
      onClick={() => handleAnimeSelect(anime)}
    >
      <div className="relative w-full h-52 rounded-lg overflow-hidden group">
        <Image
          src={anime.image}
          alt={anime.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 "></div>

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

        <motion.div className="flex group-hover:hidden transition-colors duration-300 items-center justify-between absolute bottom-1 left-0 w-full px-5 py-2 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
          <p className="text-white text-sm group\card-hover:font-bold  truncate">
            {anime.title}
          </p>
          <p className="text-white font-bold text-base group\card-hover:font-bold truncate">
            0
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AnimeCard;
