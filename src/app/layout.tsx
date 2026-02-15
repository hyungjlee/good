import type { Metadata, Viewport } from "next";
import weddingConfig from "@/config/wedding";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(weddingConfig.meta.siteUrl),
  title: weddingConfig.meta.title,
  description: weddingConfig.meta.description,
  openGraph: {
    title: weddingConfig.meta.title,
    description: weddingConfig.meta.description,
    images: [weddingConfig.meta.ogImage],
    url: weddingConfig.meta.siteUrl,
    type: "website",
    locale: "ko_KR",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap"
        />
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className="bg-bg text-text">
        <main className="max-w-[430px] mx-auto min-h-dvh bg-bg-card shadow-[0_0_40px_rgba(0,0,0,0.05)]">
          {children}
        </main>
      </body>
    </html>
  );
}
