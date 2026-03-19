import AnimatedSection from "@/components/ui/AnimatedSection";
import CopyButton from "@/components/ui/CopyButton";
import weddingConfig from "@/config/wedding";

export default function AccountSection() {
  const { groomAccounts, brideAccounts } = weddingConfig;

  const groups = [groomAccounts, brideAccounts];
  const borderColors = ["border-l-blue-200", "border-l-rose-200"];

  return (
    <AnimatedSection className="py-12 px-6">
      <div className="text-center mb-8">
        <p className="section-title">Account</p>
        <h2 className="section-heading">마음 전하실 곳</h2>
        <p className="text-xs text-text-muted mt-3 leading-relaxed">
          축하의 마음을 전해주시면<br />감사한 마음으로 잘 간직하겠습니다
        </p>
      </div>

      <div className="space-y-6">
        {groups.map((group, groupIdx) =>
          group.accounts.length > 0 && (
            <div key={group.label} className={`border-l-2 pl-4 ${borderColors[groupIdx]}`}>
              <p className="text-sm text-text-muted font-medium mb-2.5">{group.label}</p>
              <div className="space-y-3">
                {group.accounts.map((account, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-xl px-5 py-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs text-primary-dark font-medium mb-1.5">
                        {account.holder}
                        {account.phone && (
                          <a
                            href={`tel:${account.phone}`}
                            className="ml-2 text-text-muted font-normal underline decoration-text-muted/30 underline-offset-2"
                          >
                            {account.phone}
                          </a>
                        )}
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
          )
        )}
      </div>
    </AnimatedSection>
  );
}
