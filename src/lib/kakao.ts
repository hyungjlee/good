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

export function initKakao(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.Kakao) return false;
  if (window.Kakao.isInitialized()) return true;

  const key = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  if (!key) {
    console.warn("NEXT_PUBLIC_KAKAO_APP_KEY 환경변수가 설정되지 않았습니다.");
    return false;
  }

  window.Kakao.init(key);
  return window.Kakao.isInitialized();
}

interface KakaoShareParams {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export function shareKakao({ title, description, imageUrl, linkUrl }: KakaoShareParams) {
  if (!window.Kakao) {
    alert("카카오 SDK를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  if (!window.Kakao.isInitialized()) {
    const initialized = initKakao();
    if (!initialized) {
      alert("카카오 SDK 초기화에 실패했습니다.");
      return;
    }
  }

  window.Kakao.Share.sendDefault({
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
