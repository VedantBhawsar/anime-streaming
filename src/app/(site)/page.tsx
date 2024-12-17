import React, { useEffect, useState } from "react";
import AnimeCarousel from "@/components/ui/animeCarousel";
import Hero from "@/components/Hero";
import { api } from "@/lib/api";
import { chat } from "@/lib/geminiClient";

export default async function HomePage() {
  const { data } = await api.get("/anime/home");

  return (
    <div className=" bg-gradient-to-br  text-purple-800 ">
      <Hero
        backgroundImage="https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg"
        title="Demon Slayer"
        description="Tanjiro Kamado sets out on a journey of vengeance and hope to cure his sister and avenge his family."
      />

      <AnimeCarousel
        animes={data?.recentlyUpdated?.results}
        category="Recently Updated"
      />

      <AnimeCarousel animes={data?.recentlyAdded?.results} category="Recent" />

      <AnimeCarousel
        animes={data?.mostPopular?.results}
        category="Most Popular"
      />
      <AnimeCarousel
        animes={data?.mostFavorite?.results}
        category="Most Favorite"
      />
    </div>
  );
}
