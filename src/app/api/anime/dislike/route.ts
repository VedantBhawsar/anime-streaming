import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server';

export async function POST(req: Request | NextRequest) {
  try {
    const body = await req.json();
    const { userId, animeId } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingDislike = await prisma.dislike.findFirst({
      where: { userId, animeId },
    });

    if (existingDislike) {
      return NextResponse.json(
        { message: "Already Disliked" },
        { status: 200 }
      );
    }

    await prisma.dislike.create({
      data: { userId, animeId },
    });

    await prisma.like.deleteMany({
      where: { userId, animeId },
    });

    return NextResponse.json({ message: "Disliked" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}