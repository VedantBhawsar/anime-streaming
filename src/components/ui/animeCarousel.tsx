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
import EpisodeCard from "./episodeCard";
import MovieCard, { IMovie } from "./movieCard";

export interface IEpisodes {
  id: string;
  episodeId: string;
  episodeNumber: number;
  title: string;
  image: string;
  url: string;
}

interface IAnimeCarouselProps {
  animes?: any;
  movies?: IMovie[];
  isMovie?: boolean;
  category: string;
  episodes?: IEpisodes[];
  isLoading: boolean;
  isEpisodes?: boolean;
}

function AnimeCarousel({
  animes,
  movies,
  episodes,
  category,
  isLoading = false,
  isEpisodes = false,
  isMovie = false,
}: IAnimeCarouselProps) {
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
              : isEpisodes
              ? episodes?.map((episode: IEpisodes, index: number) => (
                  <CarouselItem key={index} className="basis-1/6  gap-10">
                    <EpisodeCard key={index} episode={episode} />
                  </CarouselItem>
                ))
              : isMovie
              ? movies?.map((movie: IMovie, index: number) => (
                  <CarouselItem key={index} className="basis-1/6  gap-10">
                    <MovieCard key={index} movie={movie} />
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
