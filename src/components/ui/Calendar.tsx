"use client";

import { getCalendarDays } from "@/lib/date";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarProps {
  dateStr: string;
}

export default function Calendar({ dateStr }: CalendarProps) {
  const { year, month, weddingDay, days } = getCalendarDays(dateStr);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="text-center mb-4">
        <p className="font-accent text-lg tracking-wide">
          {year}. {String(month).padStart(2, "0")}
        </p>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-xs py-1 ${
              i === 0 ? "text-rose-400" : i === 6 ? "text-blue-400" : "text-text-muted"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => (
          <div
            key={i}
            className={`text-center text-sm py-1.5 ${
              day === null
                ? ""
                : day === weddingDay
                  ? "bg-primary text-white rounded-full font-medium"
                  : i % 7 === 0
                    ? "text-rose-400"
                    : i % 7 === 6
                      ? "text-blue-400"
                      : "text-text"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
