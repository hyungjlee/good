"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: Record<string, unknown>) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (options: Record<string, unknown>) => unknown;
      };
    };
  }
}

interface KakaoMapProps {
  lat: number;
  lng: number;
  venueName: string;
}

export default function KakaoMap({ lat, lng, venueName }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = () => {
      if (!window.kakao?.maps || !mapRef.current) return;

      window.kakao.maps.load(() => {
        const position = new window.kakao!.maps.LatLng(lat, lng);
        const map = new window.kakao!.maps.Map(mapRef.current!, {
          center: position,
          level: 3,
        });
        new window.kakao!.maps.Marker({
          map,
          position,
          title: venueName,
        });
      });
    };

    // Check if SDK is already loaded
    if (window.kakao?.maps) {
      loadMap();
    } else {
      // Wait for SDK to load
      const checkInterval = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(checkInterval);
          loadMap();
        }
      }, 500);

      return () => clearInterval(checkInterval);
    }
  }, [lat, lng, venueName]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[250px] rounded-lg overflow-hidden bg-divider"
      aria-label={`${venueName} 지도`}
    />
  );
}
