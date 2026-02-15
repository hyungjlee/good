export interface Person {
  name: string;
  role: string; // e.g., '장남', '장녀'
  father: string;
  mother: string;
}

export interface Account {
  bank: string;
  number: string;
  holder: string;
}

export interface AccountGroup {
  label: string;
  accounts: Account[];
}

export interface TransportInfo {
  type: string;
  detail: string;
}

export interface Venue {
  name: string;
  hall: string;
  address: string;
  roadAddress: string;
  lat: number;
  lng: number;
  tel: string;
  transport: TransportInfo[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface MetaConfig {
  title: string;
  description: string;
  ogImage: string;
  siteUrl: string;
  kakaoShareImage: string;
}

export interface DesignConfig {
  primaryColor: string;
  fontBody: string;
  fontAccent: string;
}

export interface WeddingConfig {
  groom: Person;
  bride: Person;
  date: string; // ISO 8601
  venue: Venue;
  greeting: {
    title: string;
    message: string;
  };
  heroImage: string;
  gallery: GalleryImage[];
  groomAccounts: AccountGroup;
  brideAccounts: AccountGroup;
  meta: MetaConfig;
  design: DesignConfig;
}
