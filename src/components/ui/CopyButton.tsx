"use client";

import { useState, useCallback } from "react";

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
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text, onCopied]);

  return (
    <button
      onClick={handleCopy}
      className={`text-xs border border-border rounded px-2.5 py-1 transition-colors ${
        copied
          ? "bg-primary text-white border-primary"
          : "text-text-light hover:border-primary hover:text-primary"
      } ${className}`}
    >
      {copied ? "복사됨" : label}
    </button>
  );
}
