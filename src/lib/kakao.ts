declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

export function initKakao() {
  if (typeof window === "undefined") return;
  if (!window.Kakao) return;
  if (window.Kakao.isInitialized()) return;

  const key = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  if (key) {
    window.Kakao.init(key);
  }
}

interface KakaoShareParams {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export function shareKakao({ title, description, imageUrl, linkUrl }: KakaoShareParams) {
  if (!window.Kakao?.isInitialized()) {
    initKakao();
  }

  window.Kakao?.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl,
      link: {
        mobileWebUrl: linkUrl,
        webUrl: linkUrl,
      },
    },
    buttons: [
      {
        title: "청첩장 보기",
        link: {
          mobileWebUrl: linkUrl,
          webUrl: linkUrl,
        },
      },
    ],
  });
}
