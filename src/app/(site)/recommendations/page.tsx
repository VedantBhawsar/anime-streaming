"use client";
import AnimeCard from "@/components/ui/animeCard";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface IAnime {
  id: string;
  title: string;
  image: string;
  released?: string;
}

export default function RecommendationsPage() {
  const { data } = useSession();
  const [suggested, setSuggested] = useState<IAnime[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchRecommendations() {
    setLoading(true);
    try {
      const response = await api.get(
        `/anime/recommendations?userId=${data?.user.id}`
      );
      setSuggested(response.data.filteredAnimes);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false); // Fixed the console.log(false) to properly set loading state
    }
  }

  return (
    <section className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold text-primary">
        Recommendations
      </h1>

      {!data?.user && (
        <div className="w-full flex items-center justify-center h-40 border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            To use this feature you have to login first.
          </p>
        </div>
      )}

      {data?.user && (
        <div className="mt-5">
          {suggested?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {suggested.map((item, index: number) => (
                <AnimeCard anime={item} key={index} />
              ))}
            </div>
          ) : (
            <div className="h-48 w-full flex items-center justify-center border rounded-lg bg-muted/50">
              <Button
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
                onClick={fetchRecommendations}
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}