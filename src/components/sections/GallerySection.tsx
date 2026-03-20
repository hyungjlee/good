import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import weddingConfig from "@/config/wedding";

export default function GallerySection() {
  const { gallery } = weddingConfig;

  return (
    <AnimatedSection className="py-12" variant="fade">
      <div className="text-center px-6 mb-8">
        <p className="section-title">Gallery</p>
        <h2 className="section-heading">우리의 순간</h2>
      </div>

      <GalleryGrid images={gallery} />
    </AnimatedSection>
  );
}
