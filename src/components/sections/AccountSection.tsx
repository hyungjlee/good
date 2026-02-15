"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CopyButton from "@/components/ui/CopyButton";
import Toast from "@/components/ui/Toast";
import weddingConfig from "@/config/wedding";

export default function AccountSection() {
  const { groomAccounts, brideAccounts } = weddingConfig;
  const [toastMessage, setToastMessage] = useState("");

  const groups = [groomAccounts, brideAccounts];

  return (
    <AnimatedSection className="py-16 px-6">
      <div className="text-center mb-10">
        <p className="section-title">Account</p>
        <h2 className="section-heading">마음 전하실 곳</h2>
        <p className="text-xs text-text-muted mt-3 leading-relaxed">
          축하의 마음을 전해주시면<br />감사한 마음으로 잘 간직하겠습니다
        </p>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-xs text-text-muted font-medium mb-2.5">{group.label}</p>
            <div className="space-y-3">
              {group.accounts.map((account, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-xl px-5 py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[11px] text-primary font-medium tracking-wide mb-1.5">
                      {account.holder}
                    </p>
                    <p className="text-sm text-text tracking-wide">
                      {account.bank} {account.number}
                    </p>
                  </div>
                  <CopyButton text={account.number} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Toast
        message={toastMessage || "계좌번호가 복사되었습니다"}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage("")}
      />
    </AnimatedSection>
  );
}
