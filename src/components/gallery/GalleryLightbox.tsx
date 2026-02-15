"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { GalleryImage } from "@/types/wedding";

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="갤러리 닫기"
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/60 text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80 && currentIndex > 0) {
                onNavigate(currentIndex - 1);
              } else if (info.offset.x < -80 && currentIndex < images.length - 1) {
                onNavigate(currentIndex + 1);
              }
            }}
            className="relative w-full h-full flex items-center justify-center p-4"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={currentImage.width}
              height={currentImage.height}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </motion.div>

          {/* Navigation */}
          {currentIndex > 0 && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              aria-label="이전 사진"
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              aria-label="다음 사진"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
