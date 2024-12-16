import { NextResponse } from "next/server";

export function GET() {
  try {
    return NextResponse.json({ message: "not yet implemented" });
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
