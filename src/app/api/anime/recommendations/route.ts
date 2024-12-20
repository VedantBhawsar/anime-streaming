import { chat } from "@/lib/geminiClient";
import { prisma } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { extractAnimeNames } from "@/lib/extractAnimeNames";
import { animeGogoClient } from "@/lib/animeClient";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({
        error: "User ID is required",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        likedAnimes: true,
        Like: true,
      },
    });
    if (!user) {
      return NextResponse.json({
        error: "User not found",
      });
    }

    console.log(user);
    const animeIds = user.Like.map((like) => like.animeId);

    const prompt = `"prompt": "Given an array of anime names, generate a list of anime titles based on the input names. Ensure that the output retains the style and themes of the original titles while creating unique suggestions. The output should be formatted as a JSON array. Below is the array of anime names to consider for generating related titles: ${JSON.stringify(
      animeIds
    )}. Please provide the generated list of anime names in the format: [\"Anime Title 1\", \"Anime Title 2\", ...]."`;
    const response = await chat.ask(prompt);
    const suggestions = extractAnimeNames(response);
    console.log(suggestions);

    const animes = await Promise.all([
      ...suggestions.map((suggestion) => animeGogoClient.search(suggestion)),
    ]);


    const dfsd = await animeGogoClient.search('Jujutsu Kaisen')
console.log(dfsd)
    console.log(animes);

    const filteredAnimes = animes.map((anime) => anime.results[0]);
    return NextResponse.json({
      message: response,
      filteredAnimes,
    });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json(
      { message: "An error occurred" },
      {
        status: 500,
      }
    );
  }
}
