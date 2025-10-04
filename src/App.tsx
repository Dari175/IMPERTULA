import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProductCarousel } from "./components/ProductCarousel";
import { WorkSection } from "./components/WorkSection";
import { ContactSection } from "./components/ContactSection";
import { AssistanceSection } from "./components/AssistanceSection";
import { Footer } from "./components/Footer";
import { ProductDetail } from "./components/ProductDetail";
import { ProjectDetail } from "./components/ProjectDetail";
import { motion, AnimatePresence } from "framer-motion";

type View = "home" | "product-detail" | "project-detail";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentView("product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId);
    setCurrentView("project-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedProductId(null);
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header onLogoClick={handleBackToHome} />
      <AnimatePresence mode="wait">
        {currentView === "home" && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HeroSection />
            <AboutSection />
            <ProductCarousel onProductClick={handleProductClick} />
            <WorkSection onProjectClick={handleProjectClick} />
            <ContactSection />
            <AssistanceSection />
          </motion.main>
        )}
        
        {currentView === "product-detail" && selectedProductId && (
          <motion.main
            key="product-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ProductDetail 
              productId={selectedProductId} 
              onBack={handleBackToHome} 
            />
          </motion.main>
        )}
        
        {currentView === "project-detail" && selectedProjectId && (
          <motion.main
            key="project-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectDetail 
              projectId={selectedProjectId} 
              onBack={handleBackToHome} 
            />
          </motion.main>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}