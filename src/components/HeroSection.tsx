import { Button } from "./ui/button";
import { ArrowRight, Shield, CheckCircle, ChevronDown } from "lucide-react";
import heroImage from "figma:asset/2264f64b61e205723c7629af47513d9f5d16d709.png";
import { motion } from "motion/react";

interface HeroSectionProps {
  onViewProducts?: () => void;
  onContact?: () => void;
}

export function HeroSection({ onViewProducts, onContact }: HeroSectionProps) {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Equipo profesional de Impertula aplicando impermeabilización"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-blue-400 font-semibold">IMPERMEABILIZACIÓN PROFESIONAL</span>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Protección Total
              <span className="block text-blue-400">para tu Construcción</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-200 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Especialistas en impermeabilización y aditivos con productos de las mejores marcas: 
              <span className="font-semibold text-white"> Fester y Henkel</span>. 
              Garantizamos soluciones duraderas y de calidad superior.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-auto" onClick={scrollToProducts}>
              Ver Productos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-black border-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all w-auto"
              onClick={scrollToContact}
            >
              Contactar Ahora
            </Button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
              <span className="text-white">Más de 15 años de experiencia</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
              <span className="text-white">Productos certificados</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
              <span className="text-white">Asistencia técnica especializada</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => {
          const aboutSection = document.getElementById('nosotros');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 shadow-lg">
          <motion.p 
            className="text-white text-sm mb-2 font-medium text-center drop-shadow-lg"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Desliza hacia abajo
          </motion.p>
          <motion.div
            className="flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-blue-400 drop-shadow-lg" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}