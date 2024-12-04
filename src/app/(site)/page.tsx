
import React from "react";
import AnimeCarousel from "@/components/ui/animeCarousel";
import Hero from "@/components/Hero";

const animeCategories = [
  {
    category: "Trending Now",
    items: [
      {
        id: 1,
        title: "Demon Slayer",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Tanjiro Kamado sets out to avenge his family and cure his sister.",
      },
      {
        id: 2,
        title: "Attack on Titan",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Humanity fights for survival against giant humanoid Titans.",
      },
      {
        id: 3,
        title: "Fullmetal Alchemist",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Two brothers search for the Philosopher's Stone to restore their bodies.",
      },
      {
        id: 4,
        title: "My Hero Academia",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A world where superpowers are common, and one boy dreams of being a hero.",
      },
      {
        id: 5,
        title: "Naruto",
        image: "/api/placeholder/300",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },

      {
        id: 2,
        title: "Attack on Titan",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Humanity fights for survival against giant humanoid Titans.",
      },
      {
        id: 3,
        title: "Fullmetal Alchemist",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Two brothers search for the Philosopher's Stone to restore their bodies.",
      },
      {
        id: 4,
        title: "My Hero Academia",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A world where superpowers are common, and one boy dreams of being a hero.",
      },
      {
        id: 5,
        title: "Naruto",
        image: "/api/placeholder/300",
        description:
          "A young ninja's journey to become the strongest in his village.",
      },
    ],
  },
  {
    category: "Top Rated",
    items: [
      {
        id: 6,
        title: "Death Note",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "A supernatural notebook that kills anyone whose name is written in it.",
      },
      {
        id: 7,
        title: "One Punch Man",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description: "A hero who can defeat any opponent with a single punch.",
      },
      {
        id: 8,
        title: "Cowboy Bebop",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        description:
          "Space bounty hunters navigate a complex and dangerous universe.",
      },
    ],
  },
];

export default function AnimePage() {
  return (
    <div className=" bg-gradient-to-br  text-purple-800 ">
      {/* Hero Section */}
      <Hero
        backgroundImage="https://image.tmdb.org/t/p/w600_and_h900_bestv2/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg"
        title="Demon Slayer"
        description="Tanjiro Kamado sets out on a journey of vengeance and hope to cure his sister and avenge his family."
      />
      {/* Anime Categories */}
      {animeCategories.map((category, categoryIndex) => (
        <AnimeCarousel key={categoryIndex} category={category} />
      ))}
    </div>
  );
}
