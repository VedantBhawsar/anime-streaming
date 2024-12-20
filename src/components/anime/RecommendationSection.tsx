"use client";
import { useAnimeStore } from "@/store/anime-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { api } from "@/lib/api";
import Typing from "react-typing-animation";
import { convertToHTML } from "@/lib/textToHtml";

export default function AnimeSuggestions({
  anime,
  animeId,
}: {
  anime: any;
  animeId: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any>("");

  async function generateSuggestions() {
    setLoading(true);
    try {
      const { data } = await api.get(`/anime/suggestions/${anime.title}`);
      const html = convertToHTML(data.response);
      setSuggestions(html);
    } catch (error: any) {
      console.log(error?.message);
    }
    setLoading(false);
  }

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-2 border-pink-200 shadow-xl">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl text-pink-600">
            Unveiling the Story
          </CardTitle>
          <CardDescription>
            Let AI guide you through the captivating world of {anime?.title},
            summarizing its essence in a way that sparks curiosity and
            excitement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-40 flex justify-center items-center">
            {suggestions.length > 0 ? (
              <div>
                <span dangerouslySetInnerHTML={{ __html: suggestions }} />
              </div>
            ) : (
              <Button
                className="bg-pink-500 hover:bg-pink-600"
                onClick={generateSuggestions}
                disabled={loading}
              >
                Generate
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
