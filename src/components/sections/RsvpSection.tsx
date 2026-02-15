"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";

export default function RsvpSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    side: "groom" as "groom" | "bride",
    attending: true,
    partySize: 1,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setToast({ message: "이름을 입력해주세요", visible: true });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setToast({ message: "참석 여부가 전달되었습니다. 감사합니다!", visible: true });
        setForm({ name: "", phone: "", side: "groom", attending: true, partySize: 1, message: "" });
      } else {
        setToast({ message: "전송에 실패했습니다. 다시 시도해주세요.", visible: true });
      }
    } catch {
      setToast({ message: "네트워크 오류가 발생했습니다.", visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedSection className="py-16 px-6">
      <div className="text-center mb-8">
        <p className="section-title">RSVP</p>
        <h2 className="section-heading">참석 여부</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs text-text-muted mb-1.5">이름 *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="홍길동"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs text-text-muted mb-1.5">연락처</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="010-1234-5678"
          />
        </div>

        {/* Side */}
        <div>
          <label className="block text-xs text-text-muted mb-1.5">구분 *</label>
          <div className="flex gap-2">
            {[
              { value: "groom" as const, label: "신랑측" },
              { value: "bride" as const, label: "신부측" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setForm({ ...form, side: option.value })}
                className={`flex-1 py-2.5 text-sm rounded-lg border transition-colors ${
                  form.side === option.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-text-light hover:border-primary/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Attending */}
        <div>
          <label className="block text-xs text-text-muted mb-1.5">참석 여부 *</label>
          <div className="flex gap-2">
            {[
              { value: true, label: "참석합니다" },
              { value: false, label: "불참합니다" },
            ].map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => setForm({ ...form, attending: option.value })}
                className={`flex-1 py-2.5 text-sm rounded-lg border transition-colors ${
                  form.attending === option.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-text-light hover:border-primary/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Party Size */}
        {form.attending && (
          <div>
            <label className="block text-xs text-text-muted mb-1.5">동행 인원 (본인 포함)</label>
            <select
              value={form.partySize}
              onChange={(e) => setForm({ ...form, partySize: Number(e.target.value) })}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}명</option>
              ))}
            </select>
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-xs text-text-muted mb-1.5">축하 메시지</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            rows={3}
            placeholder="축하 메시지를 남겨주세요"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "전송 중..." : "참석 여부 전달하기"}
        </Button>
      </form>

      <Toast message={toast.message} isVisible={toast.visible} onClose={() => setToast({ ...toast, visible: false })} />
    </AnimatedSection>
  );
}
