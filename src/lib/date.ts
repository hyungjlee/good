import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format, getDay, getDaysInMonth, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";

export function getCountdown(targetDate: string) {
  const target = new Date(targetDate);
  const now = new Date();

  if (now >= target) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = differenceInDays(target, now);
  const hours = differenceInHours(target, now) % 24;
  const minutes = differenceInMinutes(target, now) % 60;
  const seconds = differenceInSeconds(target, now) % 60;

  return { days, hours, minutes, seconds, isPast: false };
}

export function getDday(targetDate: string) {
  const target = new Date(targetDate);
  const now = new Date();
  const days = differenceInDays(target, now);

  if (days === 0) return "D-Day";
  if (days > 0) return `D-${days}`;
  return `D+${Math.abs(days)}`;
}

export function formatWeddingDate(dateStr: string) {
  const date = new Date(dateStr);
  return format(date, "yyyy년 M월 d일 EEEE a h시", { locale: ko });
}

export function getCalendarDays(dateStr: string) {
  const date = new Date(dateStr);
  const monthStart = startOfMonth(date);
  const startDay = getDay(monthStart);
  const daysInMonth = getDaysInMonth(date);

  const days: (number | null)[] = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    weddingDay: date.getDate(),
    days,
  };
}
