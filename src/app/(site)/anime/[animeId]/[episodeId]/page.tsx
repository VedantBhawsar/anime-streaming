"use client";

import React, { useEffect, useState } from "react";
import { EpisodesList } from "@/components/anime/EpisodesList";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import {
  AnimeBottomSection,
  IAnime,
} from "@/components/anime/AnimeBottomSection";

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
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
    );
  }

  if (!anime || !episode) {
    return <div className="container mx-auto px-4 py-8">No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Anime Player Section */}
      <div className="lg:col-span-2">
        <div className="aspect-video w-full">
          <div className="h-full flex items-center justify-center text-white">
            <iframe
              src={episode[1]?.url}
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Anime Title and Interactions */}
        <AnimeBottomSection
          anime={anime}
          animeId={params.animeId}
          episodeId={params.episodeId}
          comments={comments}
          setComments={setComments}
        />
      </div>

      {/* Episodes Section */}
      <div className="space-y-4 lg:max-h-[800px] overflow-y-auto -mt-6">
        <EpisodesList animeId={params.animeId} anime={anime} />
      </div>
    </div>
  );
}
