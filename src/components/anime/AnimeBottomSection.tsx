"use client";
import React, { useState } from "react";
import { Heart, Share2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { CommentsList } from "./CommentsList";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export interface IEpisode {
  id?: string;
  number?: number;
  title?: string;
  isFiller?: boolean;
  url?: string;
}
export interface IAnime {
  description?: string;
  episodes?: IEpisode[];
  genres?: string[];
  id?: string;
  image?: string;
  otherName?: string;
  releaseDate?: string;
  status?: string;
  subOrDub?: string;
  title?: string;
  totalEpisodes?: number;
  type?: string;
  url?: string;
}

export interface IComment {
  content: string;
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
    email: string;
  };
  email: string;
  image: string | null;
  name: string | null;
}

export function AnimeBottomSection({
  anime,
  animeId,
  comments,
  setComments,
  episodeId,
}: {
  anime: IAnime;
  animeId: string;
  episodeId: string;
  comments: IComment[];
  setComments: (
    comments: IComment[] | ((prevComments: IComment[]) => IComment[])
  ) => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = useSession();

  async function handleComment() {
    setLoading(true);
    try {
      if (newComment.length < 3) {
        toast.error("Comment must be at least 3 characters long");
        return;
      }
      const { data: comment } = await api.post("/anime/comment", {
        content: newComment,
        userId: data?.user.id,
        animeId,
        episodeId,
      });
      setNewComment("");
      setComments((prevComments: IComment[]) => [...prevComments, comment]);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{anime?.title}</h1>
      <p className="text-base italic text-gray-600 mb-4">
        {anime?.otherName || "No other name"}
      </p>

      <div className="hidden justify-between items-center">
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
                    className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
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
              <p className="text-base text-gray-600">Type</p>
              <p className="font-semibold">{anime.type}</p>
            </div>
            <div>
              <p className="text-base text-gray-600">Status</p>
              <p className="font-semibold">{anime.status}</p>
            </div>
            <div>
              <p className="text-base text-gray-600">Episodes</p>
              <p className="font-semibold">{anime?.episodes?.length}</p>
            </div>
            <div>
              <p className="text-base text-gray-600">Genre</p>
              <p className="font-semibold">{anime?.genres?.join(", ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anime Description */}
      <Card className="mt-4">
        <CardContent className="p-4">
          <h1 className="mb-1 text-black font-semibold">Description</h1>
          <p className="text-gray-800">{anime?.description}</p>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Comments ({comments?.length})</h3>
        </div>

        {/* Comment Input */}
        <div className="mb-4">
          {data?.user ? (
            <div className="flex space-x-4">
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
                    disabled={loading}
                    onClick={handleComment}
                    variant="default"
                    className="text-base hover:bg-pink-600 bg-pink-500"
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 text-sm">
                Please login to add a comment
              </p>
            </div>
          )}
        </div>

        {/* Comments List */}
        <CommentsList comments={comments} />
      </div>
    </div>
  );
}
