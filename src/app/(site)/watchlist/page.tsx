"use client";
import AnimeCard from "@/components/ui/animeCard";

export default function WishList() {
  const localAnime =
    JSON.parse(localStorage.getItem("wishlistAnime") as string) || [];

  return (
    <section className="mt-4">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">My WatchList</h1>
      <div className="gap-5 grid grid-cols-6">
        {localAnime.map((anime: any, index: number) => (
          <AnimeCard anime={anime} key={index} />
        ))}
      </div>
    </section>
  );
}
