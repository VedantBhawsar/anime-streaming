import React from "react";
import AnimeCarousel from "@/components/ui/animeCarousel";
import Hero from "@/components/Hero";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface AnimeData {
  recentlyAddedEpisodes: {
    results: any[];
  };
  recentlyAddedMovies: {
    results: any[];
  };
  mostPopular: {
    results: any[];
  };
  topAiring: {
    results: any[];
  };
}

export default async function HomePage() {
  const { data } = await api.get<AnimeData>("/anime/home");

  if (!data) {
    return (
      <div className="space-y-8 p-4">
        <Skeleton className="w-full h-[400px] md:h-[500px] rounded-lg" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <Skeleton key={j} className="h-40 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted text-foreground">
      <div className="relative">
        <Hero
          backgroundImage="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/01-news/jjkcc-character-trailer-1.jpg?twic=v1/resize=1080/step=10/quality=100"
          title="Jujutsu kaisen"
          description={`Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item.`}
        />
      </div>

      <div className="container mx-auto space-y-8 md:space-y-12 py-8 px-4 md:px-0 overflow-hidden">
        <div>
          <AnimeCarousel
            episodes={data.recentlyAddedEpisodes?.results}
            category="Recently Updated"
            isEpisodes={true}
            isLoading={false}
          />
        </div>

        <div>
          <AnimeCarousel
            movies={data.recentlyAddedMovies?.results}
            category="Recently Added Movies"
            isMovie={true}
            isLoading={false}
          />
        </div>

        <div>
          <AnimeCarousel
            animes={data.mostPopular?.results}
            category="Most Popular"
            isLoading={false}
          />
        </div>

        <div>
          <AnimeCarousel
            animes={data.topAiring?.results}
            category="Top Airing"
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
