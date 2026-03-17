import type { WeddingConfig } from "@/types/wedding";

const weddingConfig: WeddingConfig = {
  groom: {
    name: "이형준",
    role: "장남",
    father: "이승우",
    mother: "김영아",
  },
  bride: {
    name: "이아름",
    role: "차녀",
    father: "이택호",
    mother: "길경화",
  },
  date: "2026-09-13T11:00:00+09:00",
  venue: {
    name: "아펠가모 선릉",
    hall: "4층",
    address: "서울 강남구 역삼동 707-34 한신인터밸리",
    roadAddress: "서울 강남구 테헤란로 322 한신인터밸리",
    lat: 37.5034469,
    lng: 127.0467753,
    tel: "02-2183-0230",
    transport: [
      { type: "지하철", detail: "2호선·분당선 선릉역 4번 출구 도보 1분" },
      { type: "버스", detail: "선릉역 정류장 하차" },
      { type: "주차", detail: "건물 내 지하주차장 이용 가능" },
    ],
  },
  greeting: {
    title: "소중한 분들을 초대합니다",
    message:
      "서로 다른 길을 걸어온 두 사람이\n한 길을 함께 걸어가려 합니다.\n\n귀한 걸음 하시어\n저희의 새로운 시작을\n축복해 주시면 감사하겠습니다.",
  },
  heroImage: "/images/hero.svg",
  gallery: [
    { src: "/images/gallery-1.svg", alt: "웨딩 사진 1", width: 800, height: 1200 },
    { src: "/images/gallery-2.svg", alt: "웨딩 사진 2", width: 800, height: 1200 },
    { src: "/images/gallery-3.svg", alt: "웨딩 사진 3", width: 1200, height: 800 },
    { src: "/images/gallery-4.svg", alt: "웨딩 사진 4", width: 800, height: 1200 },
    { src: "/images/gallery-5.svg", alt: "웨딩 사진 5", width: 1200, height: 800 },
    { src: "/images/gallery-6.svg", alt: "웨딩 사진 6", width: 800, height: 1200 },
  ],
  groomAccounts: {
    label: "신랑측",
    accounts: [
      { bank: "국민은행", number: "528702-04-033113", holder: "이형준" },
    ],
  },
  brideAccounts: {
    label: "신부측",
    accounts: [
      { bank: "카카오뱅크", number: "3333-25-0192280", holder: "이아름" },
    ],
  },
  meta: {
    title: "이형준 ♥ 이아름 결혼합니다",
    description: "2026년 9월 13일 일요일 오전 11시, 아펠가모 선릉 4층",
    ogImage: "/images/og-image.svg",
    siteUrl: "https://hj-areum.vercel.app",
    kakaoShareImage: "/images/kakao-share.svg",
  },
  design: {
    primaryColor: "#C9A96E",
    fontBody: "Pretendard",
    fontAccent: "Cormorant Garamond",
  },
};

export default weddingConfig;
