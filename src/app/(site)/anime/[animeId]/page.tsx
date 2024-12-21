import React from "react";
import { HeroSection } from "@/components/anime/HeroSection";
import { MainInfoCard } from "@/components/anime/MainInfoCard";
import { EpisodesList } from "@/components/anime/EpisodesList";
import AnimeSuggestions from "@/components/anime/RecommendationSection";
import { api } from "@/lib/api";

export default async function AnimeDetails({
  params,
}: {
  params: Promise<{ animeId: string }>;
}) {
  const animeId = (await params).animeId;
  const { data } = await api.get(`/anime/${animeId}`);
  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div>
        {/* Hero Section */}
        <HeroSection anime={data} />
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <MainInfoCard anime={data} animeId={animeId} />
        </div>

        {/* Episode List */}
        <div className="mb-6">
          <EpisodesList cols={8} anime={data} animeId={animeId} />
        </div>

        <div className="mb-6">
          <AnimeSuggestions anime={data} animeId={animeId} />
        </div>
      </div>
    </div>
  );
}
