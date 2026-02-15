"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import Calendar from "@/components/ui/Calendar";
import CountdownTimer from "@/components/ui/CountdownTimer";
import weddingConfig from "@/config/wedding";
import { formatWeddingDate } from "@/lib/date";
import { downloadIcs } from "@/lib/calendar";

export default function CalendarSection() {
  const { date, venue } = weddingConfig;

  const handleAddCalendar = () => {
    downloadIcs(date, venue.name, venue.hall, venue.roadAddress);
  };

  return (
    <AnimatedSection className="py-16 px-6 text-center">
      <p className="section-title">Calendar</p>
      <h2 className="section-heading mb-2">그날을 기다리며</h2>
      <p className="text-sm text-text-light mb-8">{formatWeddingDate(date)}</p>

      <Calendar dateStr={date} />

      <div className="mt-8">
        <CountdownTimer targetDate={date} />
      </div>

      <button
        onClick={handleAddCalendar}
        className="mt-6 inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors py-2 px-3"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <line x1="12" y1="14" x2="12" y2="18"/>
          <line x1="10" y1="16" x2="14" y2="16"/>
        </svg>
        캘린더에 일정 추가
      </button>
    </AnimatedSection>
  );
}
