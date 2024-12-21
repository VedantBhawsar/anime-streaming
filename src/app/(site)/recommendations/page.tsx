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
        `/anime/recommendations?userId=` + data?.user.id
      );
      setSuggested(response.data.filteredAnimes);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      console.log(false);
    }
  }
  return (
    <section className="my-5">
      <h1 className="text-xl font-bold text-purple-500">Recommendations</h1>

      {!data?.user && (
        <div className="w-full flex items-center justify-center h-40">
          <p className="text-xs text-gray-700 italic">
            To use this feature you have to login first.
          </p>
        </div>
      )}

      {data?.user && (
        <div className="mt-5">
          {suggested?.length > 0 ? (
            <div className="grid grid-cols-6 gap-4 ">
              {suggested.map((item, index: number) => (
                <AnimeCard anime={item} key={index} />
              ))}
            </div>
          ) : (
            <div className="h-48 w-full flex items-center justify-center">
              <Button
                className="text-pink-600 bg-pink-200 hover:bg-pink-300 hover:text-pink-800"
                disabled={loading}
                variant={"outline"}
                onClick={fetchRecommendations}
              >
                Generate
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
