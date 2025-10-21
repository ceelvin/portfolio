import { useState, useEffect } from "react";
import "./Navigation.css";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("headliner");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);


      const sections = ["headliner", "about", "projects", "skills"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navigation ${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Celvin</span>
          <span className="logo-accent">Kuhn</span>
        </div>


      </div>
    </nav>
  );
};

export default Navigation;
