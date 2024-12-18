import { chat } from "@/lib/geminiClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await chat.ask("suggest some icons for recommondation option");

    return NextResponse.json({
      message: response,
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
