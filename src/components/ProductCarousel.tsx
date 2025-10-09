import { Button } from "./ui/controls/button";
import { Card, CardContent } from "./ui/data-dispaly/cardGlobal/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/data-dispaly/carousel";
import { ArrowRight, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import roofWorkImage from "figma:asset/1deb37062b69e44607b54f2a9292b72aac8f0a10.png";
import completedRoofImage from "figma:asset/fc529b788e8e1e5ce2c57d2e9a34f5765dba7146.png";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Fester Festerbond",
    category: "Impermeabilizante",
    description: "Impermeabilizante acrílico de alta adherencia para azoteas y muros",
    image: "https://www.impermundo.mx/wp-content/uploads/2013/06/Impermeabilizante-Fester-Festerbond.jpg",
    brand: "Fester",
    rating: 5
  },
  {
    id: 2,
    name: "Fester Acriton Sellador 4L",
    category: "Sellador",
    description: "Sellador acrílico elastomérico para juntas y fisuras",
    image: "https://cdn11.bigcommerce.com/s-qsnqc7y8a6/images/stencil/960w/products/124/424/FESTER_ACRITON_SELLADOR_4L__19920.1715903519.png",
    brand: "Fester",
    rating: 5
  },
  {
    id: 3,
    name: "Impermeabilizante Acrílico Premium",
    category: "Impermeabilizante",
    description: "Recubrimiento impermeabilizante de alta calidad para exteriores",
    image: "https://cdn.homedepot.com.mx/productos/222979/222979-d.jpg",
    brand: "Fester",
    rating: 4
  },
  {
    id: 4,
    name: "Heckel Acelerante de Fraguado",
    category: "Aditivo",
    description: "Acelerante para reducir tiempo de fraguado del concreto",
    image: "https://images.unsplash.com/photo-1657186593846-8d3e67155468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHdhdGVycHJvb2YlMjBtYXRlcmlhbHN8ZW58MXx8fHwxNzU4NjU0NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Heckel",
    rating: 5
  },
  {
    id: 5,
    name: "Sistema Impermeabilizante Completo",
    category: "Sistema",
    description: "Solución integral de impermeabilización para proyectos comerciales",
    image: completedRoofImage,
    brand: "Fester",
    rating: 5
  }
];

interface ProductCarouselProps {
  onProductClick?: (productId: number) => void;
}

export function ProductCarousel({ onProductClick }: ProductCarouselProps) {
  return (
    <section id="productos" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Nuestros Productos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra amplia gama de productos de impermeabilización y aditivos 
            de las marcas más reconocidas del mercado
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <div className="relative">
                    {product.image.startsWith('http') ? (
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.brand === 'Fester' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.brand}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded">
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onProductClick?.(product.id)}
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button size="lg">
            Ver Todos los Productos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}