"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { GuestbookEntry as GuestbookEntryType } from "@/types/guestbook";

interface GuestbookEntryProps {
  entry: GuestbookEntryType;
  onDelete: (id: string) => void;
}

export default function GuestbookEntry({ entry, onDelete }: GuestbookEntryProps) {
  return (
    <div className="py-4 border-b border-divider last:border-b-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-text">{entry.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-muted">
            {format(new Date(entry.created_at), "yyyy.MM.dd", { locale: ko })}
          </span>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-xs text-text-muted hover:text-red-400 transition-colors px-2 py-1 -mr-2"
          >
            삭제
          </button>
        </div>
      </div>
      <p className="text-sm text-text-light leading-relaxed whitespace-pre-line">{entry.message}</p>
    </div>
  );
}
