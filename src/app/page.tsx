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
      <div className="divider my-4" />
      <GreetingSection />
      <div className="divider my-4" />
      <CalendarSection />
      <div className="divider my-4" />
      <GallerySection />
      <div className="divider my-4" />
      <LocationSection />
      <div className="divider my-4" />
      <AccountSection />
      <div className="divider my-4" />
      <GuestbookSection />
      <div className="divider my-4" />
      <FooterSection />
    </>
  );
}
