import Hero from "@/components/Hero";
import About from "@/components/About";
import Accommodation from "@/components/Accommodation";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import BookingSystem from "@/components/BookingSystem";
import SocialFeed from "@/components/SocialFeed";
import WeatherWidget from "@/components/WeatherWidget";
import AIChatWidget from "@/components/AIChatWidget";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import PWAFeatures from "@/components/PWAFeatures";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Accommodation />
      <Services />
      <Gallery />
      <BookingSystem />
      <Testimonials />
      <WeatherWidget />
      <SocialFeed />
      <Contact />
      
      {/* Interactive Features */}
      <AIChatWidget />
      <WhatsAppButton />
      <CookieConsent />
      <PWAFeatures />
    </main>
  );
}