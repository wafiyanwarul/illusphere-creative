import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { AboutSection } from "./components/AboutSection";
import { PartnershipSection } from "./components/PartnershipSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { TechStackShowcase } from "./components/TechStackShowcase";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { OrderServicesPage } from "./pages/OrderServicesPage";

const Home = () => {
  return (
    <div className="page-wrapper">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <PartnershipSection />
      <TestimonialsSection />
      <TechStackShowcase />
      <CTASection />
    </div>
  );
};

// Redirect component for old page URLs
const RedirectToHome = ({ section }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(`/#${section}`, { replace: true });
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [navigate, section]);
  
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BackgroundEffects />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order-services" element={<OrderServicesPage />} />
            <Route path="/about" element={<RedirectToHome section="about" />} />
            <Route path="/partnership" element={<RedirectToHome section="partnership" />} />
            <Route path="/services" element={<RedirectToHome section="services" />} />
            <Route path="/portfolio" element={<RedirectToHome section="portfolio" />} />
            <Route path="/testimonials" element={<RedirectToHome section="testimonials" />} />
            <Route path="/tech-stack" element={<RedirectToHome section="tech-stack" />} />
            <Route path="/contact" element={<RedirectToHome section="contact" />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
