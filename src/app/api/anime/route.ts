import { hianime } from '@/lib/animeClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const anime = await hianime.search('jujutsu kaisen')
    const series = await hianime.getInfo('jujutsu-kaisen-0-movie-17763')
    const a = await hianime.getEpisodes('jujutsu-kaisen-tv-534')
    const b = await hianime.getEpisodeSources('jujutsu-kaisen-tv-534?ep=10789')
    return NextResponse.json({ anime, series, a, b })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(error)
  }
}
