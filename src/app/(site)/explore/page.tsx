"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetGenres } from "@/query/get-genres";
import { useGetGenreData } from "@/query/get-genre-data";
import AnimeCardLoading from "@/components/ui/animeCardLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AnimeCard from "@/components/ui/animeCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ExplorePage() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: genres, isLoading: isGenresLoading } = useGetGenres();
  const searchParams = useSearchParams();
  const genre = searchParams.get("q") || "action";
  const page = searchParams.get("page") || "1";
  const {
    data: genreData,
    refetch,
    isRefetching: isGenreDataFetching,
    isLoading: isGenreDataLoading,
  } = useGetGenreData(genre, page);

  async function handleGenreChange(value: string) {
    router.push("/explore" + "?" + "q=" + value + "?page=1");
    setTimeout(refetch, 800);
  }

  return (
    <div className="container mx-auto px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">
          Explore - <span className="capitalize">{genre}</span>
        </h2>
        {isGenresLoading ? (
          <Skeleton className="w-24 h-8" />
        ) : (
          <Select
            defaultValue={genre || (genres && genres[0])}
            onValueChange={handleGenreChange}
          >
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder="Genres" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {genres?.map((genre: string) => (
                <SelectItem key={genre} value={genre} className="capitalize">
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-5 ">
        <AnimatePresence>
          {isGenreDataLoading || isGenreDataFetching
            ? Array(20)
                .fill("")
                .map((_, index) => <AnimeCardLoading key={index} />)
            : genreData?.results?.map((anime: any, index: number) => (
                <motion.div
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.3 },
                  }}
                  key={index}
                >
                  <AnimeCard anime={anime} />
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
      <AnimePagination
        hasNextPage={genreData?.hasNextPage}
        currentPage={genreData?.currentPage}
        totalPages={genreData?.totalPages}
        refetch={refetch}
      />
    </div>
  );
}

interface IAnimePagination {
  hasNextPage: boolean | undefined;
  currentPage: number | undefined;
  totalPages: number | undefined;
  refetch: () => void;
}

function AnimePagination({
  hasNextPage,
  currentPage,
  totalPages,
  refetch,
}: IAnimePagination) {
  const searchParams = useSearchParams();
  const genre = searchParams.get("q") || "action";
  const curPages = (currentPage && currentPage) || 1;
  const totPages = (totalPages && totalPages) || 1;
  const router = useRouter();
  const pathname = usePathname();

  console.log("genre", genre);

  function handlePageChange(page: number) {
    router.push(
      "/explore" + "?" + "q=" + genre.split("?")[0] + "?" + "page=" + page
    );
    setTimeout(refetch, 100);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(curPages - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(curPages + 1)}>
            {curPages + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => currentPage && handlePageChange(curPages + 2)}
          >
            {curPages + 2}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(totPages)}>
            {totPages}
          </PaginationLink>
        </PaginationItem>
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              aria-disabled
              onClick={() => handlePageChange(curPages + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
