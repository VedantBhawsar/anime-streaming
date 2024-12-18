import { animePaheClient } from "@/lib/animeClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await animePaheClient.search("jujutsu");
    console.log(response);
    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}
