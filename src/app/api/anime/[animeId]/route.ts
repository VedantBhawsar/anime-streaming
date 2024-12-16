import { animePaheClient } from "@/lib/animeClient";
import { getRedisClient } from "@/lib/redisClient";
import { NextResponse } from "next/server";

// eslint-disable-next-line
export async function GET(request: Request, { params }: any) {
  try {
    const animeId = params?.animeId;

    if (!animeId) {
      return NextResponse.json({
        error: "Anime ID is required",
      });
    }

    const redisClient = getRedisClient();
    const cachedAnime = await redisClient.get(animeId);
    if (cachedAnime) {
      return NextResponse.json(JSON.parse(cachedAnime));
    }

    const response = await animePaheClient.fetchAnimeInfo(animeId);
    await redisClient.set(animeId, JSON.stringify(response));
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message },
      { status: 500 }
    );
  }
}