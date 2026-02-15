"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    naver?: {
      maps: {
        Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (options: Record<string, unknown>) => unknown;
      };
    };
  }
}

interface MapEmbedProps {
  lat: number;
  lng: number;
  venueName: string;
}

export default function MapEmbed({ lat, lng, venueName }: MapEmbedProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const initMap = () => {
    if (!window.naver?.maps || !mapRef.current || initialized.current) return;

    const position = new window.naver.maps.LatLng(lat, lng);
    const map = new window.naver.maps.Map(mapRef.current, {
      center: position,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: 9,
      },
    });
    new window.naver.maps.Marker({
      map,
      position,
      title: venueName,
    });

    initialized.current = true;
  };

  useEffect(() => {
    if (window.naver?.maps) {
      initMap();
    }
  }, [lat, lng, venueName]);

  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  return (
    <>
      {clientId && (
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`}
          strategy="lazyOnload"
          onLoad={initMap}
        />
      )}
      <div
        ref={mapRef}
        className="w-full h-[250px] rounded-lg overflow-hidden bg-divider"
        aria-label={`${venueName} 지도`}
      />
    </>
  );
}
