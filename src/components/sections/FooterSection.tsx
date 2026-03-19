"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import KakaoShareButton from "@/components/share/KakaoShareButton";
import Toast from "@/components/ui/Toast";
import weddingConfig from "@/config/wedding";
import { copyToClipboard } from "@/lib/clipboard";
import { formatWeddingDate } from "@/lib/date";

export default function FooterSection() {
  const { meta, groom, bride, date } = weddingConfig;
  const [toast, setToast] = useState({ message: "", visible: false });

  const handleCopyLink = async () => {
    const success = await copyToClipboard(meta.siteUrl);
    setToast({
      message: success ? "링크가 복사되었습니다" : "복사에 실패했습니다",
      visible: true,
    });
  };

  return (
    <AnimatedSection className="py-12 px-6 pb-safe" variant="fade-slow">
      <div className="text-center mb-6">
        <p className="section-title">Share</p>
        <h2 className="section-heading">소식 전하기</h2>
      </div>

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

      {/* Closing */}
      <div className="mt-12 text-center">
        <div className="w-8 h-px bg-primary/40 mx-auto mb-4" />
        <p className="font-accent text-sm tracking-wide text-text-muted">
          {groom.name} &amp; {bride.name}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {formatWeddingDate(date)}
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
