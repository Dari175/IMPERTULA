import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Star, Package, Shield, Droplets, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
}

const products = [
  {
    id: 1,
    name: "Fester Festerbond",
    category: "Impermeabilizante",
    description: "Impermeabilizante acrílico de alta adherencia para azoteas y muros",
    image: "https://www.impermundo.mx/wp-content/uploads/2013/06/Impermeabilizante-Fester-Festerbond.jpg",
    brand: "Fester",
    rating: 5,
    fullDescription: "Festerbond es un impermeabilizante acrílico de alta calidad diseñado para proteger azoteas, muros y superficies expuestas a la intemperie. Su fórmula avanzada proporciona una excelente adherencia y durabilidad.",
    features: [
      "Alta resistencia a los rayos UV",
      "Excelente elasticidad y flexibilidad",
      "Fácil aplicación con brocha, rodillo o aspersión",
      "Resistente al intemperismo",
      "Bajo mantenimiento",
      "Secado rápido"
    ],
    applications: [
      "Azoteas de concreto",
      "Muros exteriores",
      "Superficies horizontales y verticales",
      "Reparaciones y mantenimiento"
    ],
    specifications: {
      presentation: "Cubetas de 19L y 4L",
      coverage: "2-3 m² por litro",
      dryingTime: "2-4 horas al tacto",
      colors: "Blanco, Terracota, Gris"
    }
  },
  {
    id: 2,
    name: "Fester Acriton Sellador 4L",
    category: "Sellador",
    description: "Sellador acrílico elastomérico para juntas y fisuras",
    image: "https://cdn11.bigcommerce.com/s-qsnqc7y8a6/images/stencil/960w/products/124/424/FESTER_ACRITON_SELLADOR_4L__19920.1715903519.png",
    brand: "Fester",
    rating: 5,
    fullDescription: "Acriton Sellador es un producto elastomérico de alto rendimiento diseñado para sellar juntas, grietas y fisuras en todo tipo de superficies. Su excelente adherencia y flexibilidad lo hace ideal para zonas con movimiento.",
    features: [
      "Alta elasticidad y flexibilidad",
      "Excelente adherencia sobre múltiples sustratos",
      "Resistente al agua y a la intemperie",
      "No se agrieta ni se desprende",
      "Aplicación fácil y rápida",
      "Pintable después del curado"
    ],
    applications: [
      "Sellado de juntas de construcción",
      "Reparación de grietas en muros y losas",
      "Sellado de perímetro de ventanas y puertas",
      "Uniones entre diferentes materiales"
    ],
    specifications: {
      presentation: "Cubetas de 4L",
      coverage: "Depende del ancho de junta",
      dryingTime: "24 horas curado completo",
      colors: "Blanco, Gris"
    }
  },
  {
    id: 3,
    name: "Impermeabilizante Acrílico Premium",
    category: "Impermeabilizante",
    description: "Recubrimiento impermeabilizante de alta calidad para exteriores",
    image: "https://cdn.homedepot.com.mx/productos/222979/222979-d.jpg",
    brand: "Fester",
    rating: 4,
    fullDescription: "Nuestro impermeabilizante acrílico premium ofrece la máxima protección para superficies exteriores. Formulado con resinas acrílicas de alta calidad que garantizan durabilidad y resistencia extrema.",
    features: [
      "Protección superior contra agua y humedad",
      "Alta resistencia a condiciones climáticas extremas",
      "Refleja rayos solares reduciendo temperatura",
      "Fórmula de larga duración",
      "Acabado estético y uniforme",
      "Ecológico y bajo en compuestos volátiles"
    ],
    applications: [
      "Azoteas residenciales y comerciales",
      "Terrazas y balcones",
      "Muros de contención",
      "Superficies de concreto expuestas"
    ],
    specifications: {
      presentation: "Cubetas de 19L",
      coverage: "2.5-3.5 m² por litro",
      dryingTime: "3-5 horas",
      colors: "Múltiples colores disponibles"
    }
  },
  {
    id: 4,
    name: "Heckel Acelerante de Fraguado",
    category: "Aditivo",
    description: "Acelerante para reducir tiempo de fraguado del concreto",
    image: "https://images.unsplash.com/photo-1657186593846-8d3e67155468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHdhdGVycHJvb2YlMjBtYXRlcmlhbHN8ZW58MXx8fHwxNzU4NjU0NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Heckel",
    rating: 5,
    fullDescription: "El acelerante de fraguado Heckel es un aditivo químico de alto rendimiento que acelera significativamente el tiempo de fraguado del concreto, permitiendo mayor productividad en obras.",
    features: [
      "Reduce el tiempo de fraguado hasta en 50%",
      "No afecta la resistencia final del concreto",
      "Permite trabajar a bajas temperaturas",
      "Ideal para reparaciones urgentes",
      "Compatible con cementos Portland",
      "Dosificación precisa y controlada"
    ],
    applications: [
      "Reparaciones de emergencia",
      "Trabajos en clima frío",
      "Proyectos con tiempos ajustados",
      "Prefabricados de concreto"
    ],
    specifications: {
      presentation: "Garrafas de 5L y 20L",
      dosage: "0.5-2% del peso del cemento",
      reduction: "Hasta 50% del tiempo de fraguado",
      compatibility: "Todo tipo de cemento Portland"
    }
  },
  {
    id: 5,
    name: "Sistema Impermeabilizante Completo",
    category: "Sistema",
    description: "Solución integral de impermeabilización para proyectos comerciales",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    brand: "Fester",
    rating: 5,
    fullDescription: "Sistema completo de impermeabilización que incluye primer, membrana impermeabilizante y acabado protector. Diseñado para proyectos comerciales e industriales que requieren máxima confiabilidad.",
    features: [
      "Sistema multicapa de alta resistencia",
      "Garantía extendida de hasta 10 años",
      "Instalación por aplicadores certificados",
      "Resistencia a tráfico peatonal moderado",
      "Incluye accesorios y detalles",
      "Soporte técnico especializado"
    ],
    applications: [
      "Edificios comerciales",
      "Naves industriales",
      "Estacionamientos en azotea",
      "Hospitales y escuelas"
    ],
    specifications: {
      presentation: "Sistema completo por m²",
      coverage: "Según proyecto",
      warranty: "Hasta 10 años",
      installation: "Solo aplicadores certificados"
    }
  }
];

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Producto no encontrado</h2>
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
            Volver a Productos
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Imagen del producto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1590736969955-71cc94901144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
                }}
              />
            </Card>
          </motion.div>

          {/* Información principal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className={
                  product.brand === 'Fester' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                }>
                  {product.brand}
                </Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-muted-foreground">
                  ({product.rating}.0)
                </span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Especificaciones Técnicas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Presentación:</span>
                    <span className="font-medium">{product.specifications.presentation}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Rendimiento:</span>
                    <span className="font-medium">{product.specifications.coverage}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Tiempo de secado:</span>
                    <span className="font-medium">{product.specifications.dryingTime}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Colores:</span>
                    <span className="font-medium">{product.specifications.colors}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                Solicitar Cotización
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Ficha Técnica
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Características y aplicaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Características Principales
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  Aplicaciones Recomendadas
                </h3>
                <ul className="space-y-3">
                  {product.applications.map((application, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{application}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">¿Necesitas asesoría técnica?</h3>
                  <p className="text-muted-foreground mb-4">
                    Nuestro equipo de expertos está disponible para ayudarte a elegir el producto adecuado 
                    y resolver cualquier duda técnica sobre la aplicación.
                  </p>
                  <Button>Contactar a un Especialista</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}