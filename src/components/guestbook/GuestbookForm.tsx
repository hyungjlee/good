"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface GuestbookFormProps {
  onSubmitted: () => void;
  onToast: (message: string) => void;
}

export default function GuestbookForm({ onSubmitted, onToast }: GuestbookFormProps) {
  const [form, setForm] = useState({ name: "", password: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.password.trim() || !form.message.trim()) {
      onToast("모든 항목을 입력해주세요");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        onToast("메시지가 등록되었습니다");
        setForm({ name: "", password: "", message: "" });
        onSubmitted();
      } else {
        onToast("등록에 실패했습니다");
      }
    } catch {
      onToast("네트워크 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          placeholder="이름"
          maxLength={20}
          required
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          placeholder="비밀번호"
          maxLength={20}
          required
        />
      </div>
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
        rows={3}
        placeholder="축하 메시지를 남겨주세요 (최대 500자)"
        maxLength={500}
        required
      />
      <Button type="submit" disabled={loading} variant="outline" className="w-full">
        {loading ? "등록 중..." : "메시지 남기기"}
      </Button>
    </form>
  );
}
