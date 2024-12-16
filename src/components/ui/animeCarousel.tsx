"use client";
import AnimeCard from "./animeCard";
import AnimeCardLoading from "./animeCardLoading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

function AnimeCarousel({ animes, category, isLoading = false }: any) {
  return (
    <div className="px-0 py-8 border-b border-pink-300">
      <h2 className="text-2xl font-bold mb-4 text-purple-800">{category}</h2>

      <div>
        {/* Anime Carousel */}
        <Carousel className="w-full ">
          <CarouselContent>
            {isLoading
              ? Array(10)
                  .fill("")
                  .map((_, index) => (
                    <CarouselItem key={index} className="basis-1/6  gap-10">
                      {" "}
                      <AnimeCardLoading />
                    </CarouselItem>
                  ))
              : animes?.map((anime: any, index: number) => (
                  <CarouselItem key={index} className="basis-1/6  gap-10">
                    <AnimeCard key={index} anime={anime} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="text-pink-400 hover:text-pink-500 border border-pink-500" />
          <CarouselNext className="text-pink-400 hover:text-pink-500 border border-pink-500" />
        </Carousel>
      </div>
    </div>
  );
}

export default AnimeCarousel;
