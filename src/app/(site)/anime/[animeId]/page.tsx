import React from 'react'
import { HeroSection } from '@/components/anime/HeroSection'
import { MainInfoCard } from '@/components/anime/MainInfoCard'
import { EpisodesList } from '@/components/anime/EpisodesList'
import AnimeSuggestions from '@/components/anime/RecommendationSection'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'

async function fetchAnimeDetails(animeId: string) {
  try {
    const { data } = await api.get(`/anime/${animeId}`)
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.log('error fetching anime details:', error.message)
    } else {
      console.log('unexpected error:', error)
    }
    return null
  }
}

export default async function AnimeDetails({ params }: { params: Promise<{ animeId: string }> }) {
  const animeId = (await params).animeId
  const data = await fetchAnimeDetails(animeId)

  return (
    <div className={cn('min-h-screen')}>
      <div className="container mx-auto px-4 py-6 pt-0 space-y-8">
        {/* Hero Section */}
        <div className="w-full">
          <HeroSection anime={data} />
        </div>

        {/* Main Info div */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <MainInfoCard anime={data} animeId={animeId} />
          </div>
          <div className="hidden md:block md:col-span-2"></div>
        </div>

        {/* Episodes div */}
        <div className="w-full">
          <div className="bg-card rounded-lg">
            <EpisodesList anime={data} animeId={animeId} />
          </div>
        </div>

        {/* Recommendations div */}
        <div className="w-full">
          <div className="bg-card rounded-lg">
            <AnimeSuggestions anime={data} animeId={animeId} />
          </div>
        </div>
      </div>
    </div>
  )
}
