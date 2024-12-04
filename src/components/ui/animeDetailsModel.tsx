"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimeDetailsModal({
  anime,
  handleCloseModal,
  open,
}: {
  anime: any;
  handleCloseModal: () => void;
  open: boolean;
}) {
  return (
    <AnimatePresence>
      {anime && (
        <Dialog open={open} onOpenChange={handleCloseModal}>
          <DialogContent asChild>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-purple-800/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <motion.div
                className="bg-pink-50 rounded-lg max-w-2xl w-full p-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <DialogHeader>
                  <DialogTitle className="text-purple-800">
                    {anime.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-1/3 mr-6 rounded-lg"
                  />
                  <div>
                    <p className="text-lg mb-4 text-gray-700">
                      {anime.description}
                    </p>
                    <DialogFooter className="flex space-x-4">
                      <Button className="bg-pink-600 text-white hover:bg-pink-700">
                        <Play className="mr-2" /> Watch Now
                      </Button>
                      <Button
                        variant="outline"
                        className="border-pink-600 text-pink-600 hover:bg-pink-100"
                      >
                        Add to List
                      </Button>
                    </DialogFooter>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
