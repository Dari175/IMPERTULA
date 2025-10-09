import { Button } from "./ui/controls/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/data-dispaly/cardGlobal/card";
import { Input } from "./ui/forms/input";
import { Textarea } from "./ui/forms/textarea";
import { Label } from "./ui/forms/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section id="contacto" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Contáctanos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte con tus proyectos de impermeabilización. 
            Contáctanos para recibir una cotización personalizada
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" placeholder="Tu apellido" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" placeholder="+52 773 732 0000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa (Opcional)</Label>
                  <Input id="company" placeholder="Nombre de tu empresa" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project">Tipo de Proyecto</Label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                    <option value="">Selecciona un tipo</option>
                    <option value="residencial">Residencial</option>
                    <option value="comercial">Comercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="institucional">Institucional</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Cuéntanos sobre tu proyecto, área a impermeabilizar, productos de interés, etc."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Información y Mapa */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p className="text-muted-foreground">
                      Fester Tula<br />
                      Tula de Allende, Hidalgo<br />
                      México
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Teléfonos</h4>
                    <p className="text-muted-foreground">
                      +52 773 732 0000<br />
                      +52 773 732 0001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Correos</h4>
                    <p className="text-muted-foreground">
                      info@festertula.com<br />
                      ventas@festertula.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Horarios</h4>
                    <p className="text-muted-foreground">
                      Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                      Sábados: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Mapa */}
            <Card>
              <CardHeader>
                <CardTitle>Nuestra Ubicación</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-64 bg-gray-200 rounded-b-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.615288114501!2d-99.3402687596813!3d20.053654121220745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d22d2370ac9f7f%3A0x62c03634558ee69f!2sFESTER%20TULA!5e0!3m2!1ses-419!2smx!4v1759212559589!5m2!1ses-419!2smx" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación FESTER TULA - IMPERTULA"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}