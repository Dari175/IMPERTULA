# Sistema de Autenticación y Gestión - Impertula

## Descripción General

Se ha implementado un sistema completo de autenticación con roles (cliente/admin) y gestión de contenido (productos y proyectos) para el sitio web de Impertula.

## Características Implementadas

### 1. **Sistema de Autenticación**
- Login con email y contraseña
- Gestión de sesiones mediante localStorage
- Roles: Cliente (por defecto) y Administrador
- Protección de rutas administrativas

### 2. **Credenciales de Prueba**

**Administrador:**
- Email: `admin@impertula.com`
- Contraseña: `admin123`

**Cliente:**
- Email: `cliente@impertula.com`
- Contraseña: `cliente123`

### 3. **Panel de Administración**

El administrador tiene acceso a:

#### Gestión de Productos
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Vista previa de productos

#### Gestión de Proyectos
- ✅ Crear nuevos proyectos
- ✅ Editar proyectos existentes
- ✅ Eliminar proyectos
- ✅ Vista previa de proyectos

### 4. **Estructura de Archivos**

```
/lib
  ├── auth-context.tsx          # Contexto de autenticación
  └── data-store.ts              # Store de datos y API mock

/components
  ├── Login.tsx                  # Componente de login
  ├── AdminPanel.tsx             # Panel principal de administración
  ├── ProductManagement.tsx      # CRUD de productos
  └── ProjectManagement.tsx      # CRUD de proyectos
```

### 5. **API Mock (Preparado para API Real)**

El sistema actualmente usa un API mock que simula llamadas HTTP. Para conectar con una API real, reemplaza las funciones en `/lib/data-store.ts`:

```typescript
// EJEMPLO: Cambiar de mock a API real

// ANTES (Mock):
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...productsData];
  },
  // ...
};

// DESPUÉS (API Real):
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch('/api/products');
    return response.json();
  },
  // ...
};
```

### 6. **Endpoints API Preparados**

El sistema está preparado para los siguientes endpoints:

**Autenticación:**
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

**Productos:**
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/:id` - Actualizar producto (admin)
- `DELETE /api/products/:id` - Eliminar producto (admin)

**Proyectos:**
- `GET /api/projects` - Obtener todos los proyectos
- `GET /api/projects/:id` - Obtener un proyecto
- `POST /api/projects` - Crear proyecto (admin)
- `PUT /api/projects/:id` - Actualizar proyecto (admin)
- `DELETE /api/projects/:id` - Eliminar proyecto (admin)

## Flujo de Uso

### Para Clientes (Vista por Defecto)
1. El sitio web se muestra en modo cliente por defecto
2. Los usuarios pueden navegar libremente
3. Ver productos y proyectos
4. Contactar a la empresa

### Para Administradores
1. Click en "Iniciar Sesión" en el header
2. Usar credenciales de administrador
3. Aparece botón "Admin" en el header
4. Click en "Admin" para acceder al panel
5. Gestionar productos y proyectos

## Características de Seguridad

- ✅ Sesiones persistentes (localStorage)
- ✅ Validación de roles
- ✅ Protección de rutas administrativas
- ✅ Logout seguro
- ⚠️ **IMPORTANTE**: Para producción, implementar:
  - JWT tokens
  - Refresh tokens
  - Validación backend
  - HTTPS obligatorio
  - Rate limiting

## Transición a API Real

### Paso 1: Implementar Backend
Crear endpoints REST en tu servidor backend (Node.js, Python, PHP, etc.)

### Paso 2: Actualizar auth-context.tsx
```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    return { success: false, error: 'Credenciales incorrectas' };
  }
  
  const data = await response.json();
  setUser(data.user);
  localStorage.setItem('auth_token', data.token);
  return { success: true };
};
```

### Paso 3: Actualizar data-store.ts
Reemplazar funciones mock con fetch real a tu API.

### Paso 4: Agregar Token Authentication
```typescript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
};
```

## Notificaciones

El sistema usa `sonner` para notificaciones toast. Ejemplos:

```typescript
import { toast } from "sonner@2.0.3";

// Éxito
toast.success("Producto creado exitosamente");

// Error
toast.error("Error al guardar");

// Info
toast.info("Cambios guardados");

// Warning
toast.warning("Acción no permitida");
```

## Mantenimiento

### Agregar Nuevos Campos a Productos
1. Actualizar interfaz `Product` en `/lib/data-store.ts`
2. Actualizar formulario en `ProductManagement.tsx`
3. Actualizar vista en `ProductDetail.tsx`

### Agregar Nuevos Campos a Proyectos
1. Actualizar interfaz `Project` en `/lib/data-store.ts`
2. Actualizar formulario en `ProjectManagement.tsx`
3. Actualizar vista en `ProjectDetail.tsx`

## Consideraciones Importantes

1. **Los datos se pierden al recargar**: Actualmente en memoria. Para persistencia, conectar con backend.
2. **Sin validación real de credenciales**: Mock acepta credenciales predefinidas.
3. **localStorage no es seguro para datos sensibles**: En producción usar httpOnly cookies.
4. **Sin protección CSRF**: Implementar tokens CSRF en producción.

## Próximos Pasos Recomendados

1. ✅ Implementar backend con base de datos
2. ✅ Agregar JWT authentication
3. ✅ Implementar upload de imágenes
4. ✅ Agregar validación de formularios con Zod
5. ✅ Implementar paginación para productos/proyectos
6. ✅ Agregar búsqueda y filtros
7. ✅ Implementar audit logs
8. ✅ Agregar más roles (editor, viewer, etc.)

---

**Desarrollado para Impertula - Sistema de Gestión de Contenido**
