"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { GalleryImage } from "@/types/wedding";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-3 gap-[3px]">
      {images.map((image, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          onClick={() => onImageClick(index)}
          className="relative aspect-square overflow-hidden"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 430px) 33vw, 143px"
            loading="lazy"
          />
        </motion.button>
      ))}
    </div>
  );
}
