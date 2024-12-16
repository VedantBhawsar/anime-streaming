"use client";

import React, { useEffect, useRef } from "react";
import { VideoPlayer } from "@/components/ui/video-player";
import Hls from "hls.js";
import { useAnimeStore } from "@/store/anime-store";
import { EpisodesList } from "@/components/anime/EpisodesList";
import AnimeCard from "@/components/ui/animeCard";
import { AnimeMetadata } from "@/types/anime";
import { AnimeBottomSection } from "@/components/anime/AnimeBottomSection";

export default function AnimePage() {
  const { anime } = useAnimeStore() as {
    anime: any;
  };

  const animeMetadata: AnimeMetadata = {
    title: "Fullmetal Alchemist: Brotherhood",
    originalTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST",
    studio: "Bones",
    genre: ["Action", "Adventure", "Drama", "Fantasy"],
    episodes: 64,
    status: "Completed",
    rating: 9.1,
    description:
      "Two brothers search for the Philosopher's Stone after an attempt to revive their deceased mother goes horrifically wrong. In their quest, they uncover a massive conspiracy that challenges everything they know about alchemy and their world.",
    coverImage: "/fullmetal-alchemist-cover.jpg",
  };

  console.log(anime);

  const playerRef = useRef<{ hls?: Hls | null } | null>(null);

  useEffect(() => {
    if (playerRef.current) {
      return () => {
        if (playerRef.current?.hls) {
          playerRef.current.hls.destroy();
          playerRef.current.hls = null;
        }
      };
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Anime Player Section */}
      <div className="lg:col-span-2">
        <div className="aspect-video w-full">
          <div className="h-full flex items-center justify-center text-white">
            <VideoPlayer
              id={"player"}
              option={{
                url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
                volume: 1,
                customType: {
                  m3u8: (video: HTMLVideoElement, url: string, art: any) => {
                    if (Hls.isSupported()) {
                      if (art.hls) {
                        art.hls.destroy();
                        art.hls = null;
                      }
                      const hls = new Hls();
                      hls.loadSource(url);
                      hls.attachMedia(video);
                      art.hls = hls;
                      art.on("destroy", () => hls.destroy());
                    } else if (
                      video.canPlayType("application/vnd.apple.mpegurl")
                    ) {
                      video.src = url;
                    } else {
                      art.notice.show = "Unsupported playback format";
                    }
                  },
                },
                title: "vedant",
                quality: [
                  { url: "https://example.com/360.m3u8", quality: "360p" },
                  { url: "https://example.com/480.m3u8", quality: "480p" },
                  { url: "https://example.com/720.m3u8", quality: "720p" },
                  { url: "https://example.com/1080.m3u8", quality: "1080p" },
                  {
                    url: "https://example.com/default.m3u8",
                    quality: "default",
                  },
                ].map((source) => ({
                  default: source.quality === "default",
                  html: source.quality,
                  url: source.url,
                })),
                isLive: false,
                muted: false,
                autoOrientation: true,
                pip: true,
                fullscreenWeb: true,
                screenshot: true,
                setting: true,
                loop: false,
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                autoplay: true,
                autoSize: true,
                autoMini: true,
                miniProgressBar: true,
                mutex: true,
                backdrop: true,
                playsInline: true,
                autoPlayback: true,
                airplay: true,
                fullscreen: true,
                subtitleOffset: false,
                theme: "#F5316F",
                whitelist: ["*"],
                moreVideoAttr: {
                  crossOrigin: "anonymous",
                },
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              getInstance={(art: any) => {
                console.info("Player instance:", art);
                playerRef.current = art;
              }}
            />
          </div>
        </div>

        {/* Anime Title and Interactions */}
        <AnimeBottomSection anime={anime} animeMetadata={animeMetadata} />
      </div>

      {/* Episodes Section */}
      <div className="space-y-4 lg:max-h-[800px] overflow-hidden -mt-6">
        <EpisodesList />
      </div>

      {/* Related Anime Section (Mobile Hidden) */}
      <div className="hidden lg:block col-span-3 mt-8">
        <h3 className="text-xl font-bold mb-4">Related Anime</h3>
        <div className="grid grid-cols-5 gap-4">
          {anime?.recommendations?.map((anime: any, index: number) => (
            <AnimeCard anime={anime} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
