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
      url: `https://map.naver.com/v5/search/${encodeURIComponent("선릉 아펠가모")}`,
    },
    {
      name: "카카오내비",
      url: `https://map.kakao.com/link/to/${encodeURIComponent(venueName)},${lat},${lng}`,
    },
    {
      name: "티맵",
      url: `tmap://route?goalname=${encodeURIComponent(venueName)}&goalx=${lng}&goaly=${lat}`,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-0">
      {navApps.map((app, idx) => (
        <span key={app.name} className="flex items-center">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-light hover:text-primary transition-colors py-2.5 px-3"
          >
            {app.name}
          </a>
          {idx < navApps.length - 1 && (
            <span className="mx-3 text-border">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
