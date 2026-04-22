import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import MobileMenu from "./components/layout/MobileMenu";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import HighlightsSection from "./components/sections/HighlightsSection";
import JourneySection from "./components/sections/JourneySection";
import WisataSection from "./components/sections/WisataSection";
import UmkmSection from "./components/sections/UmkmSection";
import GunungSection from "./components/sections/GunungSection";
import GaleriSection from "./components/sections/GaleriSection";
import CtaBanner from "./components/sections/CtaBanner";
import KontakSection from "./components/sections/KontakSection";
import Footer from "./components/layout/Footer";
import "./styles/global.css";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Navbar
        scrolled={scrolled}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
      />
      <MobileMenu menuOpen={menuOpen} onClose={closeMenu} />

      <HeroSection />
      <AboutSection />
      <HighlightsSection />
      <JourneySection />
      <WisataSection />
      <UmkmSection />
      <GunungSection />
      <GaleriSection />
      <CtaBanner />
      <KontakSection />
      <Footer />
    </>
  );
}