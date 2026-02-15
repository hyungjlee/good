"use client";

import { useState, useEffect } from "react";
import { getCountdown } from "@/lib/date";

export function useCountdown(targetDate: string) {
  const [countdown, setCountdown] = useState(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  }));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCountdown(getCountdown(targetDate));
    setMounted(true);

    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return { ...countdown, mounted };
}
