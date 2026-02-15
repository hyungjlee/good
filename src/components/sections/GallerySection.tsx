"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import weddingConfig from "@/config/wedding";

export default function GallerySection() {
  const { gallery } = weddingConfig;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <AnimatedSection className="py-16">
      <div className="text-center px-6 mb-8">
        <p className="section-title">Gallery</p>
        <h2 className="section-heading">우리의 순간</h2>
      </div>

      <GalleryGrid images={gallery} onImageClick={handleImageClick} />

      <GalleryLightbox
        images={gallery}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </AnimatedSection>
  );
}
