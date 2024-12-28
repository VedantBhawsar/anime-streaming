import { animeGogoClient } from '@/lib/animeClient'
import { prisma } from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ episodeId: string }> }) {
  const episodeId = (await params).episodeId
  try {
    const sources = await animeGogoClient.fetchEpisodeServers(episodeId)

    const comments = await prisma.comment.findMany({
      where: {
        episode: episodeId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(
      { sources, comments },
      {
        status: 200,
      },
    )
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 },
    )
  }
}
