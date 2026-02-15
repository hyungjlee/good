"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import KakaoShareButton from "@/components/share/KakaoShareButton";
import Toast from "@/components/ui/Toast";
import weddingConfig from "@/config/wedding";
import { copyToClipboard } from "@/lib/clipboard";

export default function FooterSection() {
  const { meta } = weddingConfig;
  const [toast, setToast] = useState({ message: "", visible: false });

  const handleCopyLink = async () => {
    const success = await copyToClipboard(meta.siteUrl);
    setToast({
      message: success ? "링크가 복사되었습니다" : "복사에 실패했습니다",
      visible: true,
    });
  };

  return (
    <AnimatedSection className="py-12 px-6 pb-safe">
      <div className="space-y-3">
        <KakaoShareButton />

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-medium border border-border text-text-light hover:border-primary hover:text-primary transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          링크 복사하기
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] text-text-muted">
          Made with love
        </p>
      </div>

      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </AnimatedSection>
  );
}
