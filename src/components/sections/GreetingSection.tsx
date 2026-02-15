"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingConfig from "@/config/wedding";

export default function GreetingSection() {
  const { greeting, groom, bride } = weddingConfig;

  return (
    <AnimatedSection className="py-16 px-6 text-center">
      <p className="section-title">Invitation</p>
      <h2 className="section-heading mb-8">{greeting.title}</h2>

      <p className="text-sm leading-7 text-text-light whitespace-pre-line mb-10">
        {greeting.message}
      </p>

      {/* Parents */}
      <div className="text-sm text-text-light space-y-3">
        <div className="flex items-center justify-center gap-2">
          <span>{groom.father}</span>
          <span className="text-text-muted">·</span>
          <span>{groom.mother}</span>
          <span className="text-text-muted text-xs ml-1">의 {groom.role}</span>
          <span className="font-medium text-text ml-1">{groom.name}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span>{bride.father}</span>
          <span className="text-text-muted">·</span>
          <span>{bride.mother}</span>
          <span className="text-text-muted text-xs ml-1">의 {bride.role}</span>
          <span className="font-medium text-text ml-1">{bride.name}</span>
        </div>
      </div>
    </AnimatedSection>
  );
}
