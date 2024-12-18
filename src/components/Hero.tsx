"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Play, Info, Fullscreen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  backgroundImage: string;
  title: string;
  description: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, title, description }) => {
  const divRef = useRef(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const enterFullScreen = () => {
    const element = divRef.current;
    if (element) {
      // @ts-ignore
      if (element.requestFullscreen) {
        // @ts-ignore
        element.requestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        (element as any).mozRequestFullScreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      }
    }
  };

  return (
    <motion.div
      className="relative h-[80vh] bg-cover bg-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={divRef}
    >
      <motion.div
        className="h-full bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(to bottom,
              rgba(0,0,0,0.0) 40%,
              rgba(0, 0, 0, 1) 100%
            ),
            url(${backgroundImage})
          `,
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute bottom-14 left-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold text-pink-500 mb-2"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-base tracking-wide text-justify max-w-xl mb-6 text-white line-clamp-4"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        <motion.div className="flex space-x-4" variants={itemVariants}>
          <Button asChild className="bg-pink-600 text-white hover:bg-pink-700">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="mr-2" /> Watch Now
            </motion.button>
          </Button>

          <Button variant="outline" asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="mr-2" /> More Info
            </motion.button>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-8 right-8">
        <Button size={"icon"} onClick={enterFullScreen}>
          <Fullscreen className="text-white" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
