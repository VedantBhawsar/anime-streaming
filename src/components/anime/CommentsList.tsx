"use client";

import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CommentsList({ comments }: any) {
  function handleLikeComment(id: string) {}
  return (
    <div className="space-y-4">
      {comments?.map((comment: any) => (
        <div
          key={comment.id}
          className="flex space-x-4 border p-5 border-pink-500 rounded-lg bg-white"
        >
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
              <p className="text-sm text-gray-500">{comment.timestamp}</p>
            </div>
            <p className="text-gray-700">{comment.content}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLikeComment(comment?.id)}
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
  );
}
