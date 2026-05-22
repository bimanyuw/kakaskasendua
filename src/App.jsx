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
  const [isAdminRoute, setIsAdminRoute] = useState(() => window.location.hash === "#admin");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("kk-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
