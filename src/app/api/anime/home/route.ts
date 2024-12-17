import { animePaheClient } from "@/lib/animeClient";
import { getRedisClient } from "@/lib/redisClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const redisClient =  getRedisClient();
    const cacheKey = "homePageData";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    const [recentlyAdded, mostPopular, mostFavorite, recentlyUpdated] =
      await Promise.all([
        animePaheClient.fetchRecentlyAdded(),
        animePaheClient.fetchMostPopular(),
        animePaheClient.fetchMostFavorite(),
        animePaheClient.fetchRecentlyUpdated(),
        animePaheClient.fetchTopAiring(),
      ]);

    const homeData = {
      recentlyAdded,
      mostPopular,
      mostFavorite,
      recentlyUpdated,
    };

    await redisClient.set(cacheKey, JSON.stringify(homeData), {
      EX: 1000 * 60 * 60,
    });

    return NextResponse.json(homeData, {
      status: 200
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
