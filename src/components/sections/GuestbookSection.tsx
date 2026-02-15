"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GuestbookForm from "@/components/guestbook/GuestbookForm";
import GuestbookList from "@/components/guestbook/GuestbookList";
import Toast from "@/components/ui/Toast";

export default function GuestbookSection() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState({ message: "", visible: false });

  return (
    <AnimatedSection className="py-16 px-6">
      <div className="text-center mb-8">
        <p className="section-title">Guestbook</p>
        <h2 className="section-heading">방명록</h2>
      </div>

      <GuestbookForm
        onSubmitted={() => setRefreshKey((k) => k + 1)}
        onToast={(message) => setToast({ message, visible: true })}
      />

      <GuestbookList
        refreshKey={refreshKey}
        onToast={(message) => setToast({ message, visible: true })}
      />

      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </AnimatedSection>
  );
}
