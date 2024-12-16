import { animePaheClient } from "@/lib/animeClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await animePaheClient.fetchEpisodeSources(
      "https://hianime.to/watch/mountain-and-sea-organization-19420?ep=129562"
    );

    console.log(response);
    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}
