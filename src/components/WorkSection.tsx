import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { AspectRatio } from "./ui/aspect-ratio";
import { ArrowRight, MapPin, Calendar, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { projectApi, Project, ProjectImage } from "../lib/api";
import Autoplay from "embla-carousel-autoplay@8.6.0";

interface WorkSectionProps {
  onProjectClick?: (projectId: string) => void;
  onViewAll?: () => void;
}

// Función utilitaria para obtener la URL de la imagen principal
const getPrincipalImageUrl = (project: Project): string | null => {
  // Prioridad 1: Buscar en imagenes array
  if (project.imagenes && project.imagenes.length > 0) {
    const principal = project.imagenes.find(img => img.esPrincipal) || project.imagenes[0];
    
    if (principal.tipo === 'url' && principal.url) {
      return principal.url;
    } else if (principal.tipo === 'base64' && principal.data && principal.mimeType) {
      return `data:${principal.mimeType};base64,${principal.data}`;
    }
  }
  
  // Prioridad 2: URL legacy
  if (project.urlImagen) {
    return project.urlImagen;
  }
  
  return null;
};

export function WorkSection({ onProjectClick, onViewAll }: WorkSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectApi.getAll();
      // Asegurarse de que data sea un array
      if (Array.isArray(data)) {
        setProjects(data);
      } else if (data && typeof data === 'object') {
        // Si la API devuelve {data: [...]} o similar
        const projectsArray = (data as any).data || (data as any).proyectos || (data as any).projects || [];
        setProjects(Array.isArray(projectsArray) ? projectsArray : []);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };
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
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando proyectos...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay proyectos disponibles</p>
            </div>
          ) : (
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => (
                <CarouselItem key={project._id || project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        {getPrincipalImageUrl(project) ? (
                          <img
                            src={getPrincipalImageUrl(project)!}
                            alt={project.titulo}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-muted-foreground">Sin imagen</span>
                          </div>
                        )}
                      </AspectRatio>
                      <div className="absolute top-4 left-4">
                        <Badge variant={project.estado === "Completado" ? "default" : "secondary"}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {project.estado}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90">
                          {project.categoria}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.titulo}
                      </h3>
                      
                      <div className="flex items-center text-muted-foreground mb-3 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate flex-1">{project.ubicacion}</span>
                        <Calendar className="h-3 w-3 ml-2 mr-1" />
                        <span>{project.fecha}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                        {project.descripcionCorta}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={() => onProjectClick?.(project._id || project.id || "")}
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
          )}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button size="lg" onClick={onViewAll}>
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