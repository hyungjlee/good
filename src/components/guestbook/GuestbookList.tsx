"use client";

import { useState, useEffect, useCallback } from "react";
import GuestbookEntry from "./GuestbookEntry";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import type { GuestbookEntry as GuestbookEntryType } from "@/types/guestbook";

interface GuestbookListProps {
  refreshKey: number;
  onToast: (message: string) => void;
}

export default function GuestbookList({ refreshKey, onToast }: GuestbookListProps) {
  const [entries, setEntries] = useState<GuestbookEntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries, refreshKey]);

  const handleDelete = async () => {
    if (!deleteTarget || !deletePassword) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget, password: deletePassword }),
      });

      if (res.ok) {
        onToast("메시지가 삭제되었습니다");
        setEntries(entries.filter((e) => e.id !== deleteTarget));
      } else {
        const data = await res.json();
        onToast(data.error || "삭제에 실패했습니다");
      }
    } catch {
      onToast("네트워크 오류가 발생했습니다");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
      setDeletePassword("");
    }
  };

  if (loading) {
    return (
      <div className="py-8 text-center text-sm text-text-muted">불러오는 중...</div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-text-muted">
        아직 작성된 메시지가 없습니다.<br />
        첫 번째 축하 메시지를 남겨보세요!
      </div>
    );
  }

  return (
    <>
      <div className="mt-6">
        {entries.map((entry) => (
          <GuestbookEntry
            key={entry.id}
            entry={entry}
            onDelete={setDeleteTarget}
          />
        ))}
      </div>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => { setDeleteTarget(null); setDeletePassword(""); }}
        title="메시지 삭제"
      >
        <p className="text-sm text-text-light mb-4">비밀번호를 입력해주세요.</p>
        <input
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors mb-4"
          placeholder="비밀번호"
          autoFocus
        />
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => { setDeleteTarget(null); setDeletePassword(""); }}
          >
            취소
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={handleDelete}
            disabled={deleting || !deletePassword}
          >
            {deleting ? "삭제 중..." : "삭제"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
