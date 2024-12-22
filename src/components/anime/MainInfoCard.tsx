"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Trophy, Heart, HeartCrack } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface MainInfoCardProps {
  anime: any;
  animeId: string;
}

export function MainInfoCard({ anime, animeId }: MainInfoCardProps) {
  const { data } = useSession();

  async function handleLike() {
    try {
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
      className="col-span-full lg:col-span-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full text-xl sm:text-2xl text-primary gap-4">
            <span>Overview</span>
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/90"
                onClick={handleLike}
              >
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive/90"
                onClick={handleUnlike}
              >
                <HeartCrack className="w-4 h-4 mr-2" />
                Unlike
              </Button>
            </div>
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-3">
            {anime.genres.map((genre: string) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-secondary text-secondary-foreground"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {anime?.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 dark:text-yellow-400 h-4 w-4" />
              <span className="text-sm">{anime?.rating || "N/A"}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary h-4 w-4" />
              <span className="text-sm">
                {anime?.totalEpisodes || "N/A"} Episodes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-green-500 dark:text-green-400 h-4 w-4" />
              <span className="text-sm">{anime?.status || "N/A"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}