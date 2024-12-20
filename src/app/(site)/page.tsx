import React, { useEffect, useState } from "react";
import AnimeCarousel from "@/components/ui/animeCarousel";
import Hero from "@/components/Hero";
import { api } from "@/lib/api";

export default async function HomePage() {
  const { data } = await api.get("/anime/home");
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" bg-gradient-to-br  text-purple-800 ">
      <Hero
        backgroundImage="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/01-news/jjkcc-character-trailer-1.jpg?twic=v1/resize=1080/step=10/quality=100"
        title="Jujutsu kaisen"
        description="Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the King of Curses. Yuuji experiences first-hand the threat these Curses pose to society as he discovers his own newfound powers. Introduced to the Tokyo Metropolitan Jujutsu Technical High School, he begins to walk down a path from which he cannot return—the path of a Jujutsu sorcerer. [Written by MAL Rewrite]"
      />

      <AnimeCarousel
        episodes={data?.recentlyAddedEpisodes?.results}
        category="Recently Updated"
        isEpisodes={true}
        isLoading={false}
      />
      <AnimeCarousel
        movies={data?.recentlyAddedMovies?.results}
        category="Recently Added Movies"
        isMovie={true}
        isLoading={false}
      />
      <AnimeCarousel
        animes={data?.mostPopular?.results}
        category="Most Popular"
        isLoading={false}
      />
      <AnimeCarousel
        isLoading={false}
        animes={data?.topAiring?.results}
        category="Top airing"
      />
    </div>
  );
}
