# 🌐 Impertula

**Impertula** es un sitio web profesional desarrollado con **React**, diseñado para mantener la presencia digital de la empresa en el mercado de manera más formal, moderna y funcional.
El objetivo principal es ofrecer una experiencia web elegante, rápida y adaptable a cualquier dispositivo.

---

## 🚀 Características principales

* Interfaz moderna y responsiva (React + TailwindCSS o CSS Modules)
* Navegación fluida con React Router
* Animaciones suaves (transiciones o loader inicial animado)
* Código modular y limpio para futuras integraciones (backend o CMS)

---

## 🛠️ Tecnologías utilizadas

* **React 18+**
* **Vite** o **Create React App** (según configuración)
* **JavaScript (ES6+)**
* **TailwindCSS / CSS Modules**
* **Framer Motion** *(opcional para animaciones formales)*

---

## ⚙️ Instalación y ejecución local

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/impertula.git
```

Accede al directorio del proyecto:

```bash
cd impertula
```

Instala las dependencias:

```bash
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en:

```
http://localhost:5173/
```

---

## 📁 Estructura básica del proyecto

```
impertula/
├── public/
├── src/
│   ├── assets/          # Imágenes, íconos, animaciones
│   ├── components/      # Componentes reutilizables (Header, Footer, etc.)
│   ├── pages/           # Páginas principales del sitio
│   ├── styles/          # Archivos de estilos globales
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🎨 Animación inicial sugerida

Se recomienda incluir un loader elegante al inicio de la app, por ejemplo:

```jsx
import { motion } from "framer-motion";

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mt-40"
    />
  );
}

export default Loader;
```

Esto aporta una presentación más formal y profesional cuando el sitio carga.

---

## 📌 Próximos pasos

* Integrar backend o API para contenido dinámico
* Agregar SEO y analítica
* Implementar modo oscuro y versión multilenguaje
* Optimizar para despliegue en producción (Vercel / Netlify)

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.
Puedes usarlo y modificarlo libremente para tus fines personales o empresariales.

---

👨‍💻 *Desarrollado por Arturo Darinel Lopez Castillo*
📍 *Universidad Tecnológica Tula-Tepeji (UTTT)*
