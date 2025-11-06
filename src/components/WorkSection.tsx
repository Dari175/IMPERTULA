import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { AspectRatio } from "./ui/aspect-ratio";
import { ArrowRight, MapPin, Calendar, CheckCircle, Clock, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { projectApi, Project, ProjectImage } from "../lib/api";
import backgroundImage from "figma:asset/d3d678ed3de5d7c79f508ad5d7b35231f3202b61.png";

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
    <section id="trabajos" className="py-20 relative overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Proyecto de impermeabilización"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Nuestros Trabajos</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-2xl h-full cursor-pointer bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="relative" onClick={() => onProjectClick?.(project._id || project.id || "")}>
                    <AspectRatio ratio={16/10}>
                      {getPrincipalImageUrl(project) ? (
                        <img
                          src={getPrincipalImageUrl(project)!}
                          alt={project.titulo}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full relative">
                          <img
                            src="https://images.unsplash.com/photo-1723474123029-98ec22febbeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYWludGVuYW5jZSUyMHRvb2xzfGVufDF8fHx8MTc2MjQwNzM2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="En mantenimiento"
                            className="w-full h-full object-cover opacity-30"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-[#003366]/60 flex flex-col items-center justify-center gap-4 p-6">
                            <motion.div
                              animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <Wrench className="h-16 w-16 text-white drop-shadow-lg" />
                            </motion.div>
                            <div className="text-center space-y-2">
                              <h4 className="text-white font-bold text-xl drop-shadow-md">
                                Galería en Construcción
                              </h4>
                              <p className="text-white/90 text-sm drop-shadow-sm">
                                Próximamente agregaremos<br />imágenes de este proyecto
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 left-4">
                      <Badge variant={project.estado === "Completado" ? "default" : "secondary"} className="shadow-lg">
                        {project.estado === "Completado" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {project.estado}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 shadow-lg">
                        {project.categoria}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-primary line-clamp-1 text-white">
                      {project.titulo}
                    </h3>
                    
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">
                      {project.descripcionCorta || project.descripcion}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      {project.ubicacion && (
                        <div className="flex items-center gap-2 text-white/70">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="line-clamp-1">{project.ubicacion}</span>
                        </div>
                      )}
                      
                      {(project.fechaFinalizacion || project.fecha) && (
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>{project.fecha || new Date(project.fechaFinalizacion).toLocaleDateString('es-MX', { year: 'numeric', month: 'long' })}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300"
                      onClick={() => onProjectClick?.(project._id || project.id || "")}
                    >
                      Ver Detalles
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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