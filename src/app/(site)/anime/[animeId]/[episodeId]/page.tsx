'use client'

import React, { useEffect, useState } from 'react'
import { EpisodesList } from '@/components/anime/EpisodesList'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { AnimeBottomSection, IAnime } from '@/components/anime/AnimeBottomSection'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface IAnimeEpisode {
  name: string
  url: string
}

export default function AnimePage() {
  const params = useParams() as {
    episodeId: string
    animeId: string
  }

  const [anime, setAnime] = useState<IAnime | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [episode, setEpisode] = useState<IAnimeEpisode[] | null>(null)
  const [comments, setComments] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedStream, setSelectedStream] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)
        const [animeData, episodeData] = await Promise.all([
          api.get(`/anime/${params.animeId}`),
          api.get(`/anime/episode/${params.episodeId}`),
        ])
        setAnime(animeData.data)
        setEpisode(episodeData.data.sources)
        setComments(episodeData.data.comments)
        setSelectedStream(episodeData.data.sources[0].url)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching data:', error.message)
        } else {
          console.error('Something went wrong', error)
        }
        setError('Failed to load anime data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.animeId && params.episodeId) {
      fetchData()
    }
  }, [params.animeId, params.episodeId])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pb-8 space-y-4">
        <Skeleton className="w-full aspect-video" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!anime || !episode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>No data available</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="w-full pt-0 lg:pt-0">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden mb-6">
            {episode[1]?.url ? (
              <iframe
                src={selectedStream!}
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Video unavailable
              </div>
            )}
          </div>
          <AnimeBottomSection
            episode={episode}
            anime={anime}
            animeId={params.animeId}
            episodeId={params.episodeId}
            comments={comments}
            setComments={setComments}
            changeStream={(streamUrl: string) => {
              setSelectedStream(streamUrl)
            }}
          />
        </div>
      </div>
    </div>
  )
}
