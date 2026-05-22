import { useEffect, useState } from "react";
import AdminPanel from "./components/admin/AdminPanel";
import Navbar from "./components/layout/Navbar";
import MobileMenu from "./components/layout/MobileMenu";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import JourneySection from "./components/sections/JourneySection";
import WisataSection from "./components/sections/WisataSection";
import UmkmSection from "./components/sections/UmkmSection";
import GunungSection from "./components/sections/GunungSection";
import GaleriSection from "./components/sections/GaleriSection";
import KontakSection from "./components/sections/KontakSection";
import Footer from "./components/layout/Footer";
import "./styles/global.css";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTone, setNavTone] = useState("light");
  const [navSection, setNavSection] = useState("beranda");
  const [isAdminRoute, setIsAdminRoute] = useState(() => window.location.hash === "#admin");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("kk-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const readNavTone = () => {
      const sampleY = Math.min(120, window.innerHeight - 1);
      const sampleX = Math.floor(window.innerWidth / 2);
      const el = document.elementFromPoint(sampleX, sampleY);
      const section = el?.closest?.("section, footer");
      const sectionId =
        section?.id ||
        (section?.classList.contains("kk-cta-banner") ? "cta" : "") ||
        (section?.classList.contains("kk-footer") ? "footer" : "") ||
        "beranda";
      const isDarkSurface =
        section?.id === "beranda" ||
        section?.id === "umkm" ||
        section?.id === "galeri" ||
        section?.classList.contains("kk-cta-banner") ||
        section?.classList.contains("kk-footer");

      setScrolled(window.scrollY > 50);
      setNavTone(isDarkSurface ? "light" : "dark");
      setNavSection(sectionId);
    };

    const handleScroll = () => window.requestAnimationFrame(readNavTone);
    readNavTone();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleHash = () => setIsAdminRoute(window.location.hash === "#admin");
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("kk-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const closeMenu = () => setMenuOpen(false);
  const toggleDark = () => setDarkMode((prev) => !prev);

  if (isAdminRoute) {
    return <AdminPanel />;
  }

  return (
    <>
      <Navbar
        scrolled={scrolled}
        navTone={navTone}
        navSection={navSection}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        darkMode={darkMode}
        onToggleDark={toggleDark}
      />
      <MobileMenu menuOpen={menuOpen} onClose={closeMenu} />

      <HeroSection />
      <AboutSection />
      <JourneySection />
      <WisataSection />
      <UmkmSection />
      <GunungSection />
      <GaleriSection />
      <KontakSection />
      <Footer />
    </>
  );
}
