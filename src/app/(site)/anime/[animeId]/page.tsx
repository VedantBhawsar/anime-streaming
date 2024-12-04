"use client";

import React, { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  PlayCircle,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Input } from "@/components/ui/input";

type AnimeMetadata = {
  title: string;
  originalTitle: string;
  studio: string;
  genre: string[];
  episodes: number;
  status: string;
  rating: number;
  description: string;
  coverImage: string;
};

type EpisodeInfo = {
  id: number;
  number: number;
  title: string;
  duration: string;
  releaseDate: string;
  thumbnail: string;
};

type CommentType = {
  id: number;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
};

export default function AnimePage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeInfo | null>(
    null
  );
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 1,
      username: "AnimeNinja",
      avatar:
        "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content:
        "This anime is a masterpiece! The character development is incredible.",
      likes: 42,
      timestamp: "2 weeks ago",
    },
    {
      id: 2,
      username: "StoryTeller",
      avatar:
        "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content:
        "The plot twists in this series are mind-blowing. Highly recommended!",
      likes: 28,
      timestamp: "1 week ago",
    },
  ]);
  const [newComment, setNewComment] = useState("");

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

  const episodeList: EpisodeInfo[] = [
    {
      id: 1,
      number: 1,
      title: "The Beginning of the Journey",
      duration: "24m",
      releaseDate: "Apr 5, 2009",
      thumbnail: "/episode1-thumb.jpg",
    },
    {
      id: 2,
      number: 2,
      title: "The First Step",
      duration: "24m",
      releaseDate: "Apr 12, 2009",
      thumbnail: "/episode2-thumb.jpg",
    },
    {
      id: 3,
      number: 3,
      title: "City of Heresy",
      duration: "24m",
      releaseDate: "Apr 19, 2009",
      thumbnail: "/episode3-thumb.jpg",
    },
    {
      id: 4,
      number: 4,
      title: "An Alchemist's Anguish",
      duration: "24m",
      releaseDate: "Apr 26, 2009",
      thumbnail: "/episode4-thumb.jpg",
    },
    {
      id: 5,
      number: 5,
      title: "Philosopher's Stone",
      duration: "24m",
      releaseDate: "May 3, 2009",
      thumbnail: "/episode5-thumb.jpg",
    },
  ];

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: CommentType = {
        id: comments.length + 1,
        username: "Current User",
        avatar:
          "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: newComment,
        likes: 0,
        timestamp: "Just now",
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Anime Player Section */}
      <div className="lg:col-span-2">
        <div className="bg-black aspect-video w-full mb-4">
          <div className="w-full h-full flex items-center justify-center text-white">
            <PlayCircle className="h-16 w-16 text-pink-500 cursor-pointer" />
          </div>
        </div>

        {/* Anime Title and Interactions */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {animeMetadata.title}
          </h1>
          <p className="text-base italic text-gray-600 mb-4">
            {animeMetadata.originalTitle}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-700">{animeMetadata.rating}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={isFavorite ? "text-pink-600" : ""}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isFavorite
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Anime Info */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-600">Studio</p>
                  <p className="font-semibold">{animeMetadata.studio}</p>
                </div>
                <div>
                  <p className="text-base text-gray-600">Status</p>
                  <p className="font-semibold">{animeMetadata.status}</p>
                </div>
                <div>
                  <p className="text-base text-gray-600">Episodes</p>
                  <p className="font-semibold">{animeMetadata.episodes}</p>
                </div>
                <div>
                  <p className="text-base text-gray-600">Genre</p>
                  <p className="font-semibold">
                    {animeMetadata.genre.join(", ")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Anime Description */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <p className="text-gray-700">{animeMetadata.description}</p>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                Comments ({comments.length})
              </h3>
            </div>

            {/* Comment Input */}
            <div className="flex space-x-4 mb-4">
              <Avatar>
                <AvatarImage
                  src="https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Your Avatar"
                  className="object-cover"
                />
                <AvatarFallback>YOU</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow border-b border-gray-300 py-2 focus:outline-none focus:border-pink-400 bg-white"
                  />
                  <Button
                    onClick={handleAddComment}
                    variant="default"
                    className="text-base hover:bg-pink-600 bg-pink-500"
                    
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4 border p-5 border-pink-500 rounded-lg bg-white">
                  <Avatar>
                    <AvatarImage
                      src={
                        "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={`${comment.username}'s avatar`}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {comment.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <p className="font-bold">{comment.username}</p>
                      <p className="text-sm text-gray-500">
                        {comment.timestamp}
                      </p>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="ml-1 text-sm">{comment.likes}</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="space-y-4 lg:max-h-[800px] overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Episodes</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Latest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Episode List with ScrollArea */}
        <ScrollArea className="h-[600px] w-full rounded-md border p-2">
          <div className="space-y-3">
            {episodeList.map((episode) => (
              <div
                key={episode.id}
                className={`
                  flex items-center p-2 rounded-lg cursor-pointer 
                  transition-all duration-200 
                  ${
                    selectedEpisode?.id === episode.id
                      ? "bg-pink-100 border border-pink-300"
                      : "hover:bg-pink-100 border"
                  }
                `}
                onClick={() => setSelectedEpisode(episode)}
              >
                <div className="w-24 h-16 mr-4 rounded-md overflow-hidden">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={`Episode ${episode.number} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-semibold">
                      EP {episode.number}
                    </span>
                    <span className="text-sm text-gray-500">
                      {episode.duration}
                    </span>
                  </div>
                  <p className="text-base text-gray-700 truncate">
                    {episode.title}
                  </p>
                  <p className="text-sm text-gray-500">{episode.releaseDate}</p>
                </div>
                {/* <Button variant="ghost" size="icon" className="ml-2"> */}
                  <PlayCircle className="h-6 w-6 text-pink-500" />
                {/* </Button> */}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Related Anime Section (Mobile Hidden) */}
      <div className="hidden lg:block col-span-3 mt-8">
        <h3 className="text-xl font-bold mb-4">Related Anime</h3>
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((anime) => (
            <div
              key={anime}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="bg-gray-200 aspect-[2/3] rounded-lg mb-2 relative overflow-hidden">
                <Image
                  fill
                  src={
                    "https://static.wikia.nocookie.net/jujutsu-kaisen/images/0/0e/Volume_1.png/revision/latest?cb=20200905220554&path-prefix=es"
                  }
                  alt="poster"
                />
              </div>
              <h4 className="text-base font-semibold truncate">
                Related Anime Title {anime}
              </h4>
              <p className="text-sm text-gray-600">Studio Name</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
