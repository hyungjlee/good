"use client";

import Image from "next/image";
import type { GalleryImage } from "@/types/wedding";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-3 gap-0.5">
      {images.map((image, index) => (
        <button
          key={index}
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
        </button>
      ))}
    </div>
  );
}
