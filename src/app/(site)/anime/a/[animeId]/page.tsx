import React, { Usable } from "react";
import { HeroSection } from "@/components/anime/HeroSection";
import { MainInfoCard } from "@/components/anime/MainInfoCard";
import { ActionCard } from "@/components/anime/ActionCard";
import { EpisodesList } from "@/components/anime/EpisodesList";

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

export default function AnimeDetails({}) {
  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div>
        {/* Hero Section */}
        <HeroSection />
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <MainInfoCard />

          {/* Action Card */}
          <ActionCard />
        </div>

        {/* Episode List */}
        <EpisodesList />
      </div>
    </div>
  );
}
