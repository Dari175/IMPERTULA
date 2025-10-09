import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, MapPin, Calendar, CheckCircle, Users, Ruler, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
}

const projects = [
  {
    id: 1,
    title: "Subestación Eléctrica CFE",
    location: "Estado de México",
    date: "2024",
    description: "Impermeabilización completa de azotea en instalaciones de la Comisión Federal de Electricidad con sistema de alta durabilidad.",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    category: "Industrial",
    status: "Completado",
    fullDescription: "Proyecto de impermeabilización integral en instalaciones críticas de la CFE. Se implementó un sistema multicapa de alta resistencia diseñado para soportar condiciones extremas y garantizar protección a largo plazo de equipos eléctricos sensibles.",
    client: "Comisión Federal de Electricidad (CFE)",
    duration: "3 meses",
    area: "2,500 m²",
    team: "12 especialistas",
    challenges: [
      "Trabajo en instalaciones eléctricas activas",
      "Coordinación con protocolos de seguridad CFE",
      "Impermeabilización sin interrumpir operaciones",
      "Protección de equipamiento eléctrico sensible"
    ],
    solutions: [
      "Sistema de impermeabilización Fester Premium multicapa",
      "Trabajo por secciones sin afectar operación",
      "Protocolos de seguridad eléctrica estrictos",
      "Supervisión técnica continua"
    ],
    results: [
      "100% de la superficie impermeabilizada sin incidentes",
      "Cero interrupciones en el servicio eléctrico",
      "Garantía extendida de 10 años",
      "Certificación de calidad CFE"
    ],
    products: ["Fester Festerbond Premium", "Sistema de refuerzo con malla", "Sellador elastomérico"]
  },
  {
    id: 2,
    title: "Complejo Industrial Zona Norte",
    location: "Monterrey, NL",
    date: "2024",
    description: "Aplicación de impermeabilización en proceso con equipo especializado y productos Fester de alta calidad.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    category: "Industrial",
    status: "En Proceso",
    fullDescription: "Proyecto de gran escala en complejo industrial manufacturero. Impermeabilización de naves industriales, oficinas administrativas y áreas de almacenamiento con sistemas especializados para cada zona según su uso y requerimientos.",
    client: "Grupo Industrial del Norte",
    duration: "6 meses (en curso)",
    area: "8,000 m²",
    team: "25 aplicadores certificados",
    challenges: [
      "Múltiples tipos de superficie y pendientes",
      "Coordinación con operaciones de manufactura",
      "Condiciones climáticas variables de Monterrey",
      "Diferentes requisitos por área del complejo"
    ],
    solutions: [
      "Planificación por fases según prioridades operativas",
      "Sistemas diferenciados por zona (tráfico, químicos, etc.)",
      "Monitoreo climático para optimizar aplicaciones",
      "Equipo especializado de aplicación en caliente"
    ],
    results: [
      "60% del proyecto completado exitosamente",
      "Cero afectaciones a la producción",
      "Avance adelantado al cronograma original",
      "Alta satisfacción del cliente intermedia"
    ],
    products: ["Sistema Fester Industrial", "Impermeabilizante acrílico reflectivo", "Aditivos Heckel para preparación"]
  },
  {
    id: 3,
    title: "Planta Industrial Premium",
    location: "Estado de México",
    date: "2024",
    description: "Proyecto de impermeabilización en nave industrial con sistema completo de protección.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    category: "Industrial",
    status: "Completado",
    fullDescription: "Impermeabilización completa de nave industrial de almacenamiento con requisitos especiales de protección contra humedad para productos sensibles. Sistema de alta eficiencia energética con propiedades reflectivas.",
    client: "Logística Industrial SA de CV",
    duration: "2 meses",
    area: "3,200 m²",
    team: "15 especialistas",
    challenges: [
      "Requisitos estrictos de control de humedad",
      "Necesidad de eficiencia energética",
      "Plazo ajustado de ejecución",
      "Pendientes complejas y desagües múltiples"
    ],
    solutions: [
      "Sistema Fester reflectivo de alta eficiencia",
      "Refuerzo especial en zonas de desagüe",
      "Turnos extendidos para cumplir plazos",
      "Control de calidad continuo en cada fase"
    ],
    results: [
      "Reducción del 30% en temperatura interior",
      "Proyecto entregado antes del plazo",
      "Certificación de impermeabilización total",
      "Cliente implementó el sistema en otras sucursales"
    ],
    products: ["Fester Reflectivo Premium", "Sistema de traslape reforzado", "Selladores especiales"]
  },
  {
    id: 4,
    title: "Desarrollo Habitacional",
    location: "Guadalajara, JAL",
    date: "2023",
    description: "Impermeabilización integral en desarrollo residencial con productos Fester de alta resistencia.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    category: "Residencial",
    status: "Completado",
    fullDescription: "Proyecto residencial de 120 viviendas con impermeabilización completa de azoteas, terrazas y áreas comunes. Implementación de sistema estético y funcional con garantía extendida para tranquilidad de los propietarios.",
    client: "Desarrollos Residenciales del Occidente",
    duration: "4 meses",
    area: "6,500 m²",
    team: "20 aplicadores",
    challenges: [
      "120 viviendas con diferentes configuraciones",
      "Coordinación con múltiples frentes de trabajo",
      "Acabados estéticos uniformes requeridos",
      "Temporada de lluvias durante ejecución"
    ],
    solutions: [
      "Organización por bloques de viviendas",
      "Sistema Fester residencial con acabado uniforme",
      "Programación flexible según clima",
      "Supervisión de calidad casa por casa"
    ],
    results: [
      "120 viviendas impermeabilizadas exitosamente",
      "Garantía de 7 años por escrito",
      "Cero quejas post-entrega",
      "Reconocimiento del desarrollador"
    ],
    products: ["Fester Festerbond Residencial", "Acriton Sellador", "Acabado color personalizado"]
  },
  {
    id: 5,
    title: "Proyecto Residencial Premium",
    location: "Guadalajara, JAL",
    date: "2023",
    description: "Aplicación de impermeabilización en desarrollo habitacional con productos Fester de alta calidad.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    category: "Residencial",
    status: "Completado",
    fullDescription: "Desarrollo residencial de lujo con amenidades premium. Impermeabilización de áreas habitacionales, albercas, fuentes decorativas, estacionamientos en azotea y jardines en altura con sistemas especializados para cada aplicación.",
    client: "Premium Living Guadalajara",
    duration: "5 meses",
    area: "4,800 m²",
    team: "18 especialistas",
    challenges: [
      "Múltiples tipos de impermeabilización requeridos",
      "Acabados de lujo y estética premium",
      "Impermeabilización de albercas y fuentes",
      "Jardines en altura con sistemas especiales"
    ],
    solutions: [
      "Sistemas diferenciados por aplicación específica",
      "Impermeabilizante especial para albercas",
      "Acabados premium en colores personalizados",
      "Sistema de drenaje integrado en jardines"
    ],
    results: [
      "Desarrollo de lujo completamente protegido",
      "Sistema de albercas sin filtraciones",
      "Jardines en altura funcionando perfectamente",
      "Proyecto referencia para futuros desarrollos"
    ],
    products: ["Sistema Fester Premium Residencial", "Impermeabilizante para albercas", "Selladores especiales decorativos"]
  }
];

export function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Proyecto no encontrado</h2>
          <Button onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-4">
        {/* Botón de retorno */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Proyectos
          </Button>
        </motion.div>

        {/* Hero del proyecto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <div className="relative h-96">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1590736969955-71cc94901144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Badge 
                    variant={project.status === "Completado" ? "default" : "secondary"}
                    className="bg-white/90 text-primary hover:bg-white"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                    {project.category}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    <span>{project.area}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Información del proyecto */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Descripción del Proyecto</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.fullDescription}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Desafíos del Proyecto</h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-orange-100 text-orange-600 rounded-full p-1 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-current" />
                      </div>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Soluciones Implementadas</h3>
                <ul className="space-y-3">
                  {project.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Resultados Obtenidos
                </h3>
                <ul className="space-y-3">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Detalles del Proyecto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duración</p>
                      <p className="font-medium">{project.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Ruler className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Área Total</p>
                      <p className="font-medium">{project.area}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Equipo</p>
                      <p className="font-medium">{project.team}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Productos Utilizados</h3>
                <div className="space-y-2">
                  {project.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                    >
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{product}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">¿Tienes un proyecto similar?</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Contáctanos para una cotización personalizada
                </p>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  Solicitar Cotización
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 