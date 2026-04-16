import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CatalogAboutDocs from "@/components/CatalogAboutDocs";
import ContactsSection from "@/components/ContactsSection";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О компании" },
  { id: "docs", label: "Документы" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--dark-bg)", color: "#f5f5f5" }}>
      <Navbar
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroSection heroLoaded={heroLoaded} scrollTo={scrollTo} />
      <CatalogAboutDocs scrollTo={scrollTo} />
      <ContactsSection navItems={NAV_ITEMS} scrollTo={scrollTo} />
    </div>
  );
}
