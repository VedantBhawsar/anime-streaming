"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import Link from "next/link";
import { IAnime, IEpisode } from "./AnimeBottomSection";

interface IEpisodesListProps {
  anime: IAnime;
  episodesPerPage?: number;
  animeId: string;
  cols: number;
}

export function EpisodesList({
  anime,
  episodesPerPage = 32,
  animeId,
  cols = 8,
}: IEpisodesListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    (anime?.episodes?.length || 0) / episodesPerPage
  );

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes =
    anime?.episodes?.slice(indexOfFirstEpisode, indexOfLastEpisode) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-2 border-pink-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-600">Episodes</CardTitle>
          <CardDescription>
            Watch all episodes of {anime?.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 grid-cols-${cols}`}>
            {currentEpisodes?.map((episode: IEpisode) => (
              <EpisodeCard
                episode={episode}
                key={episode.id}
                animeId={animeId}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function EpisodeCard({
  episode,
  animeId,
}: {
  episode: IEpisode;
  animeId: string;
}) {
  return (
    <Link
      href={`/anime/${animeId}/${episode.id}`}
      className="cursor-pointer border rounded-lg"
    >
      <div
        key={episode?.id}
        className="flex items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div>
          <h3 className="font-semibold">{episode?.number}</h3>
        </div>
      </div>
    </Link>
  );
}
