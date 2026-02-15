import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

const DAY_NAMES = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

/**
 * ISO 문자열에서 날짜/시간 구성 요소를 직접 추출합니다.
 * Date 객체의 타임존 변환을 완전히 우회하여
 * 서버(UTC)와 클라이언트(KST) 어디서든 동일한 결과를 보장합니다.
 */
function parseDateParts(dateStr: string) {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return null;
  return { year: +match[1], month: +match[2], day: +match[3], hour: +match[4], minute: +match[5] };
}

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
  const parts = parseDateParts(dateStr);
  if (!parts) return dateStr;

  const { year, month, day, hour } = parts;
  const dateForDay = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = DAY_NAMES[dateForDay.getUTCDay()];
  const ampm = hour < 12 ? "오전" : "오후";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  return `${year}년 ${month}월 ${day}일 ${dayOfWeek} ${ampm} ${displayHour}시`;
}

export function getCalendarDays(dateStr: string) {
  const parts = parseDateParts(dateStr);
  if (!parts) return { year: 0, month: 0, weddingDay: 0, days: [] };

  const { year, month, day } = parts;
  const monthStart = new Date(Date.UTC(year, month - 1, 1));
  const startDay = monthStart.getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  const days: (number | null)[] = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return { year, month, weddingDay: day, days };
}
