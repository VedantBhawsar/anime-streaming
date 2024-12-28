import { prisma } from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const user = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: body.userId,
        animeId: body.animeId,
      },
    })
    if (existingLike) {
      return NextResponse.json({ message: 'Already Liked' })
    }

    await prisma.like.create({
      data: {
        userId: body.userId,
        animeId: body.animeId,
      },
    })

    await prisma.dislike.deleteMany({
      where: {
        animeId: body.animeId,
        userId: body.userId,
      },
    })

    return NextResponse.json({ message: 'Liked' }, { status: 200 })
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 },
    )
  }
}
