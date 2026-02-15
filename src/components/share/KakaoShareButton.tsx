"use client";

import { useKakaoShare } from "@/hooks/useKakaoShare";
import weddingConfig from "@/config/wedding";

export default function KakaoShareButton() {
  const { meta, groom, bride } = weddingConfig;
  const { share } = useKakaoShare({
    title: meta.title,
    description: meta.description,
    imageUrl: `${meta.siteUrl}${meta.kakaoShareImage}`,
    linkUrl: meta.siteUrl,
  });

  return (
    <button
      onClick={share}
      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-medium transition-colors"
      style={{ backgroundColor: "#FEE500", color: "#191919" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67l-1.19 4.38c-.1.38.34.68.66.46l5.23-3.46c.21.01.42.02.64.02 5.52 0 10-3.58 10-7.97S17.52 3 12 3z"/>
      </svg>
      카카오톡으로 공유하기
    </button>
  );
}
