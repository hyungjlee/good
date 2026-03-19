import type { WeddingConfig } from "@/types/wedding";

const weddingConfig: WeddingConfig = {
  groom: {
    name: "곽태민",
    role: "아들",
    father: "곽현",
    mother: "박은경",
  },
  bride: {
    name: "김민선",
    role: "딸",
    father: "김정득",
    mother: "전정임",
  },
  date: "2026-05-02T15:00:00+09:00",
  venue: {
    name: "디엘웨딩홀",
    hall: "마이아홀 3층",
    address: "부산 동구 조방로 14",
    roadAddress: "부산 동구 조방로 14",
    lat: 35.1396,
    lng: 129.0563,
    tel: "",
    transport: [
      { type: "지하철", detail: "1호선 범일역 하차 - 2번 출구 이용(도보 7분)" },
      { type: "지하철", detail: "2호선 문현역 하차 - 3번 출구 이용(시민회관 방면 도보 5분)" },
      { type: "주차", detail: "동일타워 내 지하주차장 이용 가능 (예식 하객 기준 2시간 무료 주차 제공)" },
    ],
  },
  greeting: {
    title: "소중한 분들을 초대합니다",
    message:
      "서로의 손을 잡고\n평생을 함께 걸어가려 합니다.\n\n비록 모두 한자리에 모시지는 못하지만,\n저희 결혼을 향한 따뜻한 마음과 축복을\n멀리서라도 보내주신다면\n오래도록 간직하며 살아가겠습니다.",
  },
  heroImage: "/images/hero.png",
  gallery: [
    { src: "/images/gallery-1.jpg", alt: "웨딩 사진 1", width: 800, height: 1200 },
    { src: "/images/gallery-2.jpg", alt: "웨딩 사진 2", width: 800, height: 1153 },
    { src: "/images/gallery-3.jpg", alt: "웨딩 사진 3", width: 800, height: 1121 },
  ],
  groomAccounts: {
    label: "신랑측",
    accounts: [
      { bank: "국민은행", number: "000000-00-000000", holder: "곽태민" },
    ],
  },
  brideAccounts: {
    label: "신부측",
    accounts: [
      { bank: "카카오뱅크", number: "0000-00-0000000", holder: "김민선" },
    ],
  },
  meta: {
    title: "곽태민 ♥ 김민선 결혼합니다",
    description: "2026년 5월 2일 토요일 오후 3시, 디엘웨딩홀 마이아홀 3층",
    ogImage: "/images/og-image.jpg",
    siteUrl: "https://hj-areum.vercel.app",
    kakaoShareImage: "/images/kakao-share.jpg",
  },
  design: {
    primaryColor: "#C9A96E",
    fontBody: "Pretendard",
    fontAccent: "Cormorant Garamond",
  },
};

export default weddingConfig;
