"use client";

import dynamic from "next/dynamic";
import AnimatedSection from "@/components/ui/AnimatedSection";
import NavigationLinks from "@/components/map/NavigationLinks";
import CopyButton from "@/components/ui/CopyButton";
import weddingConfig from "@/config/wedding";

const MapEmbed = dynamic(() => import("@/components/map/MapEmbed"), {
  ssr: false,
  loading: () => <div className="w-full h-[250px] rounded-lg bg-divider animate-pulse" />,
});

export default function LocationSection() {
  const { venue } = weddingConfig;

  return (
    <AnimatedSection className="py-16 px-6">
      <div className="text-center mb-8">
        <p className="section-title">Location</p>
        <h2 className="section-heading">{venue.name}</h2>
        <p className="text-sm text-text-light mt-1">{venue.hall}</p>
      </div>

      {/* Map */}
      <MapEmbed lat={venue.lat} lng={venue.lng} venueName={venue.name} />

      {/* Address */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <p className="text-sm text-text">{venue.roadAddress}</p>
          <p className="text-xs text-text-muted mt-0.5">{venue.address}</p>
        </div>
        <CopyButton text={venue.roadAddress} label="주소 복사" className="shrink-0 ml-2" />
      </div>

      {/* Tel */}
      {venue.tel && (
        <a
          href={`tel:${venue.tel}`}
          className="block text-xs text-text-muted mt-2 hover:text-primary"
        >
          Tel. {venue.tel}
        </a>
      )}

      {/* Navigation Apps */}
      <div className="mt-6">
        <NavigationLinks
          lat={venue.lat}
          lng={venue.lng}
          venueName={venue.name}
          address={venue.roadAddress}
        />
      </div>

      {/* Transport Info */}
      {venue.transport.length > 0 && (
        <div className="mt-6 space-y-2">
          {venue.transport.map((info, idx) => (
            <div key={idx} className="flex gap-3 text-sm">
              <span className="text-primary font-medium shrink-0 w-10">{info.type}</span>
              <span className="text-text-light">{info.detail}</span>
            </div>
          ))}
        </div>
      )}
    </AnimatedSection>
  );
}
