"use client";

import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/clipboard";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  onCopied?: () => void;
}

export default function CopyButton({
  text,
  label = "복사",
  className = "",
  onCopied,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text, onCopied]);

  return (
    <button
      onClick={handleCopy}
      className={`text-xs border border-border rounded px-3 py-2 transition-colors ${
        copied
          ? "bg-primary-dark text-white border-primary-dark"
          : "text-text-light hover:border-primary hover:text-primary-dark"
      } ${className}`}
    >
      {copied ? "복사됨" : label}
    </button>
  );
}
