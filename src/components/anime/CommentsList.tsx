"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IComment } from "./AnimeBottomSection";
import { motion } from "framer-motion";

interface ICommentsListProps {
  comments: IComment[];
}

export function CommentsList({ comments }: ICommentsListProps) {
  return (
    <div className="space-y-4">
      {[...comments]?.reverse().map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

function CommentCard({ comment }: { comment: IComment }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.1,
      }}
      key={comment.id}
      className="flex space-x-4 border p-5 border-pink-500 rounded-lg bg-white"
    >
      <Avatar>
        <AvatarImage
          src={comment?.user?.image || ""}
          alt={`${comment?.name}'s avatar`}
          className="object-cover"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="flex items-center space-x-2">
          <p className="font-bold">
            {comment?.user.name || comment?.user?.email}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(comment?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="text-gray-700">{comment.content}</p>
      </div>
    </motion.div>
  );
}
