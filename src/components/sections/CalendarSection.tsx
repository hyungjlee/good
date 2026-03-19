import AnimatedSection from "@/components/ui/AnimatedSection";
import Calendar from "@/components/ui/Calendar";
import CountdownTimer from "@/components/ui/CountdownTimer";
import weddingConfig from "@/config/wedding";
import { formatWeddingDate } from "@/lib/date";

export default function CalendarSection() {
  const { date } = weddingConfig;

  return (
    <AnimatedSection className="py-12 px-6 text-center">
      <p className="section-title">Calendar</p>
      <h2 className="section-heading mb-2">그날을 기다리며</h2>
      <p className="text-sm text-text-light mb-8">{formatWeddingDate(date)}</p>

      <Calendar dateStr={date} />

      <div className="mt-8">
        <CountdownTimer targetDate={date} />
      </div>
    </AnimatedSection>
  );
}
