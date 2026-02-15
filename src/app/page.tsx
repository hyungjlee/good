import HeroSection from "@/components/sections/HeroSection";
import GreetingSection from "@/components/sections/GreetingSection";
import CalendarSection from "@/components/sections/CalendarSection";
import GallerySection from "@/components/sections/GallerySection";
import LocationSection from "@/components/sections/LocationSection";
import AccountSection from "@/components/sections/AccountSection";
import GuestbookSection from "@/components/sections/GuestbookSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="divider my-0" />
      <GreetingSection />
      <div className="divider my-0" />
      <CalendarSection />
      <div className="divider my-0" />
      <GallerySection />
      <div className="divider my-0" />
      <LocationSection />
      <div className="divider my-0" />
      <AccountSection />
      <div className="divider my-0" />
      <GuestbookSection />
      <div className="divider my-0" />
      <FooterSection />
    </>
  );
}
