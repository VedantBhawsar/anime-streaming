import { animeGogoClient, animePaheClient } from '@/lib/animeClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const response = await animeGogoClient.search(query)
    return NextResponse.json(response)
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(error)
  }
}
