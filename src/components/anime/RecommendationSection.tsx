"use client";
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
      className="mt-4 sm:mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-0 space-y-2">
          <CardTitle className="text-xl sm:text-2xl text-primary">
            Unveiling the Story
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Let AI guide you through the captivating world of{" "}
            <span className="text-primary/80">{anime?.title}</span>,
            summarizing its essence in a way that sparks curiosity and
            excitement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[10rem] sm:min-h-[12rem] flex justify-center items-center p-4">
            {suggestions.length > 0 ? (
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <span dangerouslySetInnerHTML={{ __html: suggestions }} />
              </div>
            ) : (
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={generateSuggestions}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}