"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Trophy, Heart, HeartCrack } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface MainInfoCardProps {
  anime: any;
  animeId: string;
}

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

export function MainInfoCard({ anime, animeId }: MainInfoCardProps) {
  const { data } = useSession();

  async function handleLike() {
    try {
      console.log(data?.user.id);
      const { data: response } = await api.post("/anime/like", {
        animeId,
        userId: data?.user.id,
      });

      toast.success(response.message);
    } catch (error: any) {
      console.log("Error liking anime", error);
      toast.error("Error liking anime");
    }
  }
  async function handleUnlike() {
    try {
      const { data: response } = await api.post("/anime/dislike", {
        animeId,
        userId: data?.user.id,
      }); 
      toast.success(response.message);
    } catch (error: any) {
      console.log("Error unliking anime", error);
      toast.error("Error unliking anime");
    }
  }
  return (
    <motion.div
      className="lg:col-span-3 col-span-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-2 border-pink-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center w-full text-2xl text-pink-600">
            <span>Overview</span>
            <span className="flex gap-0 items-center">
              <Button
                variant={"link"}
                className="text-pink-500"
                onClick={handleLike}
              >
                <Heart />
                Like
              </Button>
              <Button
                variant={"link"}
                className="text-purple-500"
                onClick={handleUnlike}
              >
                <HeartCrack />
                Unlike
              </Button>
            </span>
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-3">
            {anime.genres.map((genre: string) => (
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
