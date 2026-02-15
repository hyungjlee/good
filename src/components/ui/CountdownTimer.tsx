"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { getDday } from "@/lib/date";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate);
  const dday = getDday(targetDate);

  if (isPast) {
    return (
      <p className="text-sm text-primary font-medium">{dday}</p>
    );
  }

  const items = [
    { label: "일", value: days },
    { label: "시간", value: hours },
    { label: "분", value: minutes },
    { label: "초", value: seconds },
  ];

  return (
    <div>
      <p className="text-xs text-primary font-medium mb-3">{dday}</p>
      <div className="flex justify-center gap-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-xl font-light text-text tabular-nums">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-text-muted mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
