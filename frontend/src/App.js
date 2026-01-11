import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { WhyChooseUsSection } from "./components/WhyChooseUsSection";
import { TechStackShowcase } from "./components/TechStackShowcase";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PartnershipSection } from "./components/PartnershipSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { AboutPage } from "./pages/AboutPage";

const Home = () => {
  return (
    <div className="page-wrapper">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TechStackShowcase />
      <TestimonialsSection />
      <PartnershipSection />
      <CTASection />
    </div>
  );
};

// Placeholder pages
const ServicesPage = () => <div className="page-wrapper"><div className="placeholder-page"><h1>Services Page</h1><p>Coming soon...</p></div></div>;
const PortfolioPage = () => <div className="page-wrapper"><div className="placeholder-page"><h1>Portfolio Page</h1><p>Coming soon...</p></div></div>;
const TestimonialsPage = () => <div className="page-wrapper"><div className="placeholder-page"><h1>Testimonials Page</h1><p>Coming soon...</p></div></div>;
const TechStackPage = () => <div className="page-wrapper"><div className="placeholder-page"><h1>Tech Stack Page</h1><p>Coming soon...</p></div></div>;
const ContactPage = () => <div className="page-wrapper"><div className="placeholder-page"><h1>Contact Page</h1><p>Coming soon...</p></div></div>;
const OrderServicesPage = () => <div className="page-wrapper"><div className="placeholder-page"><h1>Order Services Page</h1><p>Coming soon...</p></div></div>;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/tech-stack" element={<TechStackPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/order-services" element={<OrderServicesPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
