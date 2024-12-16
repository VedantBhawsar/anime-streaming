"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Trophy } from "lucide-react";
import React from "react";
import { useAnimeStore } from "@/store/anime-store";

interface MainInfoCardProps {}

const animeData = {
  title: "Attack on Titan",
  japaneseTitle: "進撃の巨人",
  rating: 9.2,
  episodes: 75,
  status: "Completed",
  genre: ["Action", "Drama", "Fantasy", "Mystery"],
  synopsis:
    "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.",
};

export function MainInfoCard({}: MainInfoCardProps) {
  const { anime } = useAnimeStore();
  
  return (
    <motion.div
      className="lg:col-span-2 col-span-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-2 border-pink-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-600">Overview</CardTitle>
          <div className="flex flex-wrap gap-2 mt-3">
            {animeData.genre.map((genre: string) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6">{anime?.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" />
              <span>{animeData.rating}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="text-blue-500" />
              <span>{anime?.totalEpisodes} Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-green-500" />
              <span>{animeData.status}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
