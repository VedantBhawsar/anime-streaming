"use client";

import React, { useEffect, useState } from "react";
import { EpisodesList } from "@/components/anime/EpisodesList";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import {
  AnimeBottomSection,
  IAnime,
} from "@/components/anime/AnimeBottomSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IAnimeEpisode {
  title: string;
  url: string;
}

export default function AnimePage() {
  const params = useParams() as {
    episodeId: string;
    animeId: string;
  };

  const [anime, setAnime] = useState<IAnime | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episode, setEpisode] = useState<IAnimeEpisode[] | null>(null);
  const [comments, setComments] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const [animeData, episodeData] = await Promise.all([
          api.get(`/anime/${params.animeId}`),
          api.get(`/anime/episode/${params.episodeId}`),
        ]);

        setAnime(animeData.data);
        setEpisode(episodeData.data.sources);
        setComments(episodeData.data.comments);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load anime data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    if (params.animeId && params.episodeId) {
      fetchData();
    }
  }, [params.animeId, params.episodeId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        <Skeleton className="w-full aspect-video" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!anime || !episode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>No data available</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Main Content Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Video Player */}
        <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
          {episode[1]?.url ? (
            <iframe
              src={episode[1].url}
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Video unavailable
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <AnimeBottomSection
          anime={anime}
          animeId={params.animeId}
          episodeId={params.episodeId}
          comments={comments}
          setComments={setComments}
        />
      </div>

      {/* Episodes List Section */}
      <div className="relative">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="md:pr-4 ">
            <EpisodesList 
              animeId={params.animeId} 
              anime={anime}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}