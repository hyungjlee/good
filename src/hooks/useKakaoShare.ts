"use client";

import { useCallback, useEffect, useRef } from "react";
import { initKakao, shareKakao } from "@/lib/kakao";

interface UseKakaoShareOptions {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export function useKakaoShare(options: UseKakaoShareOptions) {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    // SDK가 async로 로드되므로, 이미 있으면 바로 초기화하고
    // 아직 없으면 로드 완료 시점에 초기화
    if (initKakao()) return;

    const script = document.querySelector<HTMLScriptElement>(
      'script[src*="kakao_js_sdk"]'
    );
    if (!script) return;

    const handleLoad = () => initKakao();
    script.addEventListener("load", handleLoad);
    return () => script.removeEventListener("load", handleLoad);
  }, []);

  const share = useCallback(() => {
    shareKakao(optionsRef.current);
  }, []);

  return { share };
}
