import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "外国人雇用の入管書類代行 | 合同会社LHジャパン (鹿児島県霧島市)",
  description:
    "鹿児島県霧島市の宿泊業・製造業に特化した行政書士事務所。外国人雇用の在留資格申請・更新・定期報告書類の作成代行と、顧問契約による継続サポートを提供します。"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Script src="/scripts/ga4-cta-tracking.js" strategy="afterInteractive" />
        <Script src="/tracker.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
