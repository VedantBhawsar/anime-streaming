import { animePaheClient } from "@/lib/animeClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recent = await animePaheClient.fetchRecentlyAdded();
    return new NextResponse(JSON.stringify(recent));
  } catch (error: any) {
    console.log(error);
  }
}
