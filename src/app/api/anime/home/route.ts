import {  animeGogoClient } from "@/lib/animeClient";
import { getRedisClient } from "@/lib/redisClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const redisClient = getRedisClient();
    const cacheKey = "homePageData";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    const [recentlyAddedEpisodes, mostPopular, topAiring, recentlyAddedMovies] =
      await Promise.all([
        await animeGogoClient.fetchRecentEpisodes(),
        await animeGogoClient.fetchPopular(),
        await animeGogoClient.fetchTopAiring(),
        await animeGogoClient.fetchRecentMovies(),
      ]);

    const homeData = {
      recentlyAddedEpisodes,
      mostPopular,
      topAiring,
      recentlyAddedMovies,
    };

    await redisClient.set(cacheKey, JSON.stringify(homeData), {
      EX: 1000 * 60 * 60,
    });

    return NextResponse.json(homeData, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "An error occurred while fetching data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
