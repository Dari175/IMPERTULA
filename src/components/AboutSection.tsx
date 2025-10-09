import { Card, CardContent } from "./ui/card";
import { Shield, Users, Award, Settings } from "lucide-react";
import impertulaBuildingImage from "../images/About_us.png";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Quiénes Somos
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Somos <strong>IMPERTULA</strong>, una empresa especializada en impermeabilización y distribución 
              de aditivos para la construcción. Con más de 15 años de experiencia en el mercado, 
              nos hemos consolidado como distribuidores autorizados de las prestigiosas marcas 
              <strong className="text-primary"> Fester</strong> y <strong className="text-primary">Heckel</strong>.
            </p>
            <p className="text-muted-foreground mb-8">
              Nuestra misión es ofrecer soluciones integrales de impermeabilización que garanticen 
              la durabilidad y protección de las construcciones, brindando productos de la más alta 
              calidad y un servicio técnico especializado.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold">Calidad Garantizada</h4>
                  <p className="text-sm text-muted-foreground">Productos certificados</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-semibold">Equipo Experto</h4>
                  <p className="text-sm text-muted-foreground">Profesionales capacitados</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={impertulaBuildingImage}
              alt="Local de IMPERTULA - Distribuidor autorizado Fester"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </motion.div>
        </div>
        
        <div className="mt-16">
          <motion.h3 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Qué Hacemos
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Impermeabilización</h4>
                <p className="text-sm text-muted-foreground">
                  Soluciones completas para techos, azoteas, muros y cimentaciones
                </p>
              </CardContent>
            </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Settings className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Aditivos</h4>
                  <p className="text-sm text-muted-foreground">
                    Productos especializados para mejorar las propiedades del concreto
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Asesoría Técnica</h4>
                  <p className="text-sm text-muted-foreground">
                    Consultoría especializada y soporte técnico personalizado
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Distribución</h4>
                  <p className="text-sm text-muted-foreground">
                    Distribuidores oficiales de las marcas Fester y Heckel
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}