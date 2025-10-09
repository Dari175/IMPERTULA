import { Button } from "./ui/controls/button";
import { Card, CardContent } from "./ui/data-dispaly/cardGlobal/card";
import { Badge } from "./ui/data-dispaly/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/data-dispaly/carousel";
import { AspectRatio } from "./ui/utils/aspect-ratio";
import { ArrowRight, MapPin, Calendar, CheckCircle } from "lucide-react";
import workImage1 from "../images/workImage1.png";
import workImage2 from "../images/workImage2.png";
import workImage3 from "../images/hero-background.png";
import cfeRoofImage from "../images/cfeRoofImage.png";
import industrialWorkImage from "../images/industrialWorkImage.png";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Subestación Eléctrica CFE",
    location: "Estado de México",
    date: "2024",
    description: "Impermeabilización completa de azotea en instalaciones de la Comisión Federal de Electricidad con sistema de alta durabilidad.",
    image: cfeRoofImage,
    category: "Industrial",
    status: "Completado"
  },
  {
    id: 2,
    title: "Complejo Industrial Zona Norte",
    location: "Monterrey, NL",
    date: "2024",
    description: "Aplicación de impermeabilización en proceso con equipo especializado y productos Fester de alta calidad.",
    image: industrialWorkImage,
    category: "Industrial",
    status: "En Proceso"
  },
  {
    id: 3,
    title: "Planta Industrial Premium",
    location: "Estado de México",
    date: "2024",
    description: "Proyecto de impermeabilización en nave industrial con sistema completo de protección.",
    image: workImage1,
    category: "Industrial",
    status: "Completado"
  },
  {
    id: 4,
    title: "Desarrollo Habitacional",
    location: "Guadalajara, JAL",
    date: "2023",
    description: "Impermeabilización integral en desarrollo residencial con productos Fester de alta resistencia.",
    image: workImage2,
    category: "Residencial",
    status: "Completado"
  },
  {
    id: 5,
    title: "Proyecto Residencial Premium",
    location: "Guadalajara, JAL",
    date: "2023",
    description: "Aplicación de impermeabilización en desarrollo habitacional con productos Fester de alta calidad.",
    image: workImage3,
    category: "Residencial",
    status: "Completado"
  }
];

interface WorkSectionProps {
  onProjectClick?: (projectId: number) => void;
}

export function WorkSection({ onProjectClick }: WorkSectionProps) {
  return (
    <section id="trabajos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Nuestros Trabajos</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conoce algunos de nuestros proyectos más destacados en impermeabilización. 
            Cada trabajo refleja nuestro compromiso con la calidad y la excelencia técnica.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-4 left-4">
                        <Badge variant={project.status === "Completado" ? "default" : "secondary"}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {project.status}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center text-muted-foreground mb-3 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate flex-1">{project.location}</span>
                        <Calendar className="h-3 w-3 ml-2 mr-1" />
                        <span>{project.date}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={() => onProjectClick?.(project.id)}
                      >
                        Ver Detalles
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button size="lg">
            Ver Todos los Proyectos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
        
        <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">150+</h3>
              <p className="text-muted-foreground">Proyectos Completados</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">15+</h3>
              <p className="text-muted-foreground">Años de Experiencia</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">500,000+</h3>
              <p className="text-muted-foreground">m² Impermeabilizados</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">98%</h3>
              <p className="text-muted-foreground">Satisfacción del Cliente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}