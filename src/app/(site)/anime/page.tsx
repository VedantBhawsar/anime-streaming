"use client";
import { Button } from "@/components/ui/button";
import {
  Play,
} from "lucide-react";
import AnimeCard from "@/components/ui/animeCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const animeCategories = [
  {
    category: "Trending Now",
    items: [
      {
        id: 1,
        title: "Demon Slayer",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Tanjiro Kamado sets out to avenge his family and cure his sister.",
      },
      {
        id: 2,
        title: "Attack on Titan",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Humanity fights for survival against giant humanoid Titans.",
      },
      {
        id: 3,
        title: "Fullmetal Alchemist",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Two brothers search for the Philosopher's Stone to restore their bodies.",
      },
      {
        id: 4,
        title: "My Hero Academia",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A world where superpowers are common, and one boy dreams of being a hero.",
      },
      {
        id: 5,
        title: "Naruto",
        image: "/api/placeholder/300",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },

      {
        id: 2,
        title: "Attack on Titan",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Humanity fights for survival against giant humanoid Titans.",
      },
      {
        id: 3,
        title: "Fullmetal Alchemist",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Two brothers search for the Philosopher's Stone to restore their bodies.",
      },
      {
        id: 4,
        title: "My Hero Academia",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A world where superpowers are common, and one boy dreams of being a hero.",
      },
      {
        id: 5,
        title: "Naruto",
        image: "/api/placeholder/300",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },

      {
        id: 2,
        title: "Attack on Titan",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Humanity fights for survival against giant humanoid Titans.",
      },
      {
        id: 3,
        title: "Fullmetal Alchemist",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Two brothers search for the Philosopher's Stone to restore their bodies.",
      },
      {
        id: 4,
        title: "My Hero Academia",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A world where superpowers are common, and one boy dreams of being a hero.",
      },
      {
        id: 5,
        title: "Naruto",
        image: "/api/placeholder/300",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },

      {
        id: 2,
        title: "Attack on Titan",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Humanity fights for survival against giant humanoid Titans.",
      },
      {
        id: 3,
        title: "Fullmetal Alchemist",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Two brothers search for the Philosopher's Stone to restore their bodies.",
      },
      {
        id: 4,
        title: "My Hero Academia",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A world where superpowers are common, and one boy dreams of being a hero.",
      },
      {
        id: 5,
        title: "Naruto",
        image: "/api/placeholder/300",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },

      {
        id: 2,
        title: "Attack on Titan",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Humanity fights for survival against giant humanoid Titans.",
      },
      {
        id: 3,
        title: "Fullmetal Alchemist",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Two brothers search for the Philosopher's Stone to restore their bodies.",
      },
      {
        id: 4,
        title: "My Hero Academia",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A world where superpowers are common, and one boy dreams of being a hero.",
      },
      {
        id: 5,
        title: "Naruto",
        image: "/api/placeholder/300",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },

      {
        id: 2,
        title: "Attack on Titan",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Humanity fights for survival against giant humanoid Titans.",
      },
      {
        id: 3,
        title: "Fullmetal Alchemist",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Two brothers search for the Philosopher's Stone to restore their bodies.",
      },
      {
        id: 4,
        title: "My Hero Academia",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A world where superpowers are common, and one boy dreams of being a hero.",
      },
      {
        id: 5,
        title: "Naruto",
        image: "/api/placeholder/300",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
    ],
  },
  {
    category: "Top Rated",
    items: [
      {
        id: 6,
        title: "Death Note",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A supernatural notebook that kills anyone whose name is written in it.",
      },
      {
        id: 7,
        title: "One Punch Man",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description: "A hero who can defeat any opponent with a single punch.",
      },
      {
        id: 8,
        title: "Cowboy Bebop",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Space bounty hunters navigate a complex and dangerous universe.",
      },
    ],
  },
];

export default function Anime() {
  const [selectedAnime, setSelectedAnime] = useState<any>(null);

  const handleAnimeSelect = (anime: any) => {
    setSelectedAnime(anime);
  };

  const handleCloseModal = () => {
    setSelectedAnime(null);
  };

  return (
    <div className="">
      <h1 className="text-2xl">Explore Anime</h1>
      <div className="grid grid-cols-4 mt-4">
        {animeCategories[0].items.map((category, index) => (
          <motion.div className="col-span-1" key={index}>
            <AnimeCard anime={category} handleAnimeSelect={handleAnimeSelect} />
          </motion.div>
        ))}
      </div>
      <div>
      </div>
      <AnimatePresence>
        {selectedAnime && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-purple-800/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-pink-50 rounded-lg max-w-2xl w-full p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-4 text-purple-800">
                {selectedAnime.title}
              </h2>
              <div className="flex">
                <img
                  src={selectedAnime.image}
                  alt={selectedAnime.title}
                  className="w-1/3 mr-6 rounded-lg"
                />
                <div>
                  <p className="text-lg mb-4 text-gray-700">
                    {selectedAnime.description}
                  </p>
                  <div className="flex space-x-4">
                    <Button className="bg-pink-600 text-white hover:bg-pink-700">
                      <Play className="mr-2" /> Watch Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-pink-600 text-pink-600 hover:bg-pink-100"
                    >
                      Add to List
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
