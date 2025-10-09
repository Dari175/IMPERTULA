import { Button } from "./ui/controls/button";
import { Menu, Phone, Mail } from "lucide-react";

interface HeaderProps {
  onLogoClick?: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 64; // altura del header sticky
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer hover:text-primary/80 transition-colors"
              onClick={onLogoClick}
            >
              IMPERTULA
            </h1>
            <div className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Distribuidor autorizado</span>
              <span className="font-semibold text-primary">FESTER</span>
              <span>&</span>
              <span className="font-semibold text-primary">HECKEL</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#inicio" 
              onClick={(e) => smoothScrollTo(e, '#inicio')}
              className="hover:text-primary transition-colors"
            >
              Inicio
            </a>
            <a 
              href="#nosotros" 
              onClick={(e) => smoothScrollTo(e, '#nosotros')}
              className="hover:text-primary transition-colors"
            >
              Nosotros
            </a>
            <a 
              href="#productos" 
              onClick={(e) => smoothScrollTo(e, '#productos')}
              className="hover:text-primary transition-colors"
            >
              Productos
            </a>
            <a 
              href="#trabajos" 
              onClick={(e) => smoothScrollTo(e, '#trabajos')}
              className="hover:text-primary transition-colors"
            >
              Trabajos
            </a>
            <a 
              href="#contacto" 
              onClick={(e) => smoothScrollTo(e, '#contacto')}
              className="hover:text-primary transition-colors"
            >
              Contacto
            </a>
            <a 
              href="#asistencia" 
              onClick={(e) => smoothScrollTo(e, '#asistencia')}
              className="hover:text-primary transition-colors"
            >
              Asistencia
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+52 773 732 0000</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@festertula.com</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}