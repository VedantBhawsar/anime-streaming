"use client";
import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import AnimeCard from "@/components/ui/animeCard";

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
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
      {
        id: 5,
        title: "Naruto",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
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
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const handleAnimeSelect = (anime:any) => {
    setSelectedAnime(anime);
    setIsDialogOpen(true);
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false);
    setSelectedAnime(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Anime</h1>

      {/* Anime Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        <AnimatePresence>
          {animeCategories[0].items.map((anime, index) => (
            <motion.div
            
              key={`${anime.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
              }}
              viewport={{
                once: true,
              }}
            >
              <AnimeCard anime={anime} handleAnimeSelect={handleAnimeSelect} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Anime Details Dialog */}
      <AnimeDetailsDialog
        isOpen={isDialogOpen}
        handleCloseModal={handleCloseModal}
        selectedAnime={selectedAnime}
      />
    </div>
  );
}

interface AnimeDetailsDialogProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  selectedAnime: any | null;
}

function AnimeDetailsDialog({
  isOpen,
  handleCloseModal,
  selectedAnime,
}: AnimeDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      {selectedAnime && (
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl text-purple-800">
              {selectedAnime.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={selectedAnime.image}
              alt={selectedAnime.title}
              className="w-full md:w-1/3 rounded-lg object-cover"
            />
            <div className="flex-1">
              <DialogDescription className="text-lg mb-4">
                {selectedAnime.description}
              </DialogDescription>
              <div className="flex space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Play className="mr-2" /> Watch Now
                </Button>
                <Button variant="secondary">Add to List</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
