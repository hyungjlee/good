import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingConfig from "@/config/wedding";

export default function GreetingSection() {
  const { greeting, groom, bride } = weddingConfig;

  return (
    <AnimatedSection className="py-12 px-6 text-center">
      <p className="section-title">Invitation</p>
      <h2 className="section-heading mb-8">{greeting.title}</h2>

      <p className="text-[15px] leading-7 text-text-light whitespace-pre-line mb-10">
        {greeting.message}
      </p>

      {/* Parents */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[15px] text-text">{groom.father}</span>
          <span className="text-text-muted">·</span>
          <span className="text-[15px] text-text">{groom.mother}</span>
          <span className="text-sm text-text-muted ml-1">의 {groom.role}</span>
          <span className="text-[15px] font-semibold text-text ml-1">{groom.name}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[15px] text-text">{bride.father}</span>
          <span className="text-text-muted">·</span>
          <span className="text-[15px] text-text">{bride.mother}</span>
          <span className="text-sm text-text-muted ml-1">의 {bride.role}</span>
          <span className="text-[15px] font-semibold text-text ml-1">{bride.name}</span>
        </div>
      </div>
    </AnimatedSection>
  );
}
