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

/**
 * ISO 문자열에서 KST 로컬 시간 부분만 추출하여 UTC로 해석합니다.
 * 이렇게 하면 서버 타임존(UTC)에서도 항상 KST 기준 날짜/시간이 표시됩니다.
 */
function parseAsKST(dateStr: string) {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return new Date(dateStr);
  const [, y, m, d, h, min] = match;
  return new Date(Date.UTC(+y, +m - 1, +d, +h, +min));
}

export function formatWeddingDate(dateStr: string) {
  const date = parseAsKST(dateStr);
  return format(date, "yyyy년 M월 d일 EEEE a h시", { locale: ko });
}

export function getCalendarDays(dateStr: string) {
  const date = parseAsKST(dateStr);
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
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    weddingDay: date.getUTCDate(),
    days,
  };
}
