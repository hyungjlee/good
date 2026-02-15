"use client";

import { useCallback, useEffect } from "react";
import { initKakao, shareKakao } from "@/lib/kakao";

interface UseKakaoShareOptions {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export function useKakaoShare(options: UseKakaoShareOptions) {
  useEffect(() => {
    initKakao();
  }, []);

  const share = useCallback(() => {
    shareKakao(options);
  }, [options]);

  return { share };
}
