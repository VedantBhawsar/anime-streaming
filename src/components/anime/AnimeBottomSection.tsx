"use client";
import React, { useState } from "react";
import { Star, Heart, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { CommentType, IAnime } from "@/types/anime";
import { CommentsList } from "./CommentsList";

export function AnimeBottomSection({
  anime,
  animeMetadata,
}: {
  anime: IAnime;
  animeMetadata: any;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [newComment, setNewComment] = useState("");

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

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{anime?.title}</h1>
      <p className="text-base italic text-gray-600 mb-4">
        {anime?.originalTitle}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-gray-700">{animeMetadata?.rating}</span>
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
              <p className="font-semibold">{animeMetadata.genre.join(", ")}</p>
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
        <CommentsList comments={comments} />
      </div>
    </div>
  );
}
