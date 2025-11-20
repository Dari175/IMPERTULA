import { useState, useRef, MouseEvent } from "react";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageZoom({ src, alt, className = "" }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isFullscreen) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    setShowLens(false);
    setIsZoomed(false);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    setScale(1);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setScale(1);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <>
      {/* Imagen normal con hover zoom */}
      <div className="relative group">
        <div
          ref={imageRef}
          className={`relative overflow-hidden cursor-zoom-in ${className}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-200"
            style={{
              transform: showLens ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Lente de zoom (hover effect) */}
          {showLens && !isFullscreen && (
            <div
              className="absolute border-2 border-white shadow-lg pointer-events-none"
              style={{
                width: '150px',
                height: '150px',
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundImage: `url(${src})`,
                backgroundPosition: `${position.x}% ${position.y}%`,
                backgroundSize: '250%',
                backgroundRepeat: 'no-repeat',
                borderRadius: '50%',
              }}
            />
          )}

          {/* Botón de maximizar */}
          <Button
            onClick={openFullscreen}
            size="sm"
            variant="secondary"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity gap-2 bg-white/90 hover:bg-white shadow-lg"
          >
            <Maximize2 className="h-4 w-4" />
            Ver imagen completa
          </Button>
        </div>

        {/* Vista previa ampliada (lado derecho en desktop) */}
        {isZoomed && showLens && (
          <div className="hidden lg:block absolute left-full top-0 ml-4 w-96 h-96 border-2 border-gray-300 bg-white shadow-2xl rounded-lg overflow-hidden z-50">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundPosition: `${position.x}% ${position.y}%`,
                backgroundSize: '250%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
        )}
      </div>

      {/* Modal de pantalla completa */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl max-h-screen p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Controles */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button
                  onClick={zoomOut}
                  size="icon"
                  variant="secondary"
                  disabled={scale <= 1}
                  className="bg-white/90 hover:bg-white"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  onClick={zoomIn}
                  size="icon"
                  variant="secondary"
                  disabled={scale >= 3}
                  className="bg-white/90 hover:bg-white"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  onClick={closeFullscreen}
                  size="icon"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Indicador de zoom */}
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(scale * 100)}%
              </div>

              {/* Imagen con zoom */}
              <div className="overflow-auto max-h-[90vh] max-w-[90vw]">
                <img
                  src={src}
                  alt={alt}
                  className="transition-transform duration-200 cursor-move"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                  }}
                  draggable={false}
                />
              </div>

              {/* Instrucciones */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full text-sm">
                Usa los botones para hacer zoom • Click fuera para cerrar
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}