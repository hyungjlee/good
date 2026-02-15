export function generateIcsContent(
  date: string,
  venueName: string,
  venueHall: string,
  venueAddress: string
) {
  const start = new Date(date);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, "0");
  const formatUtc = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//Invitation//KO",
    "BEGIN:VEVENT",
    `DTSTART:${formatUtc(start)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:결혼식`,
    `LOCATION:${venueName} ${venueHall}\\, ${venueAddress}`,
    "DESCRIPTION:결혼식에 초대합니다",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(
  date: string,
  venueName: string,
  venueHall: string,
  venueAddress: string
) {
  const content = generateIcsContent(date, venueName, venueHall, venueAddress);
  const dataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;

  // iOS Safari에서는 blob URL 다운로드가 차단되므로 data URI + window.open 사용
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.open(dataUri);
  } else {
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
