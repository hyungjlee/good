"use client";

interface NavigationLinksProps {
  lat: number;
  lng: number;
  venueName: string;
  address: string;
}

export default function NavigationLinks({ lat, lng, venueName, address }: NavigationLinksProps) {
  const navApps = [
    {
      name: "네이버지도",
      url: `https://map.naver.com/v5/search/${encodeURIComponent(venueName)}`,
    },
    {
      name: "카카오내비",
      url: `https://map.kakao.com/link/to/${encodeURIComponent(venueName)},${lat},${lng}`,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {navApps.map((app) => (
        <a
          key={app.name}
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-light hover:text-primary transition-colors border border-border rounded-lg py-3 px-5"
        >
          {app.name}
        </a>
      ))}
    </div>
  );
}
