// API centralizada para productos y proyectos
// Conecta con los endpoints reales de Impertula

const API_URLS = {
  products: 'https://product-api-bt4l.onrender.com/api/products',
  projects: 'https://apiproyects-qogl.onrender.com/api/proyectos',
  login: 'https://login-api-g0go.onrender.com/api/auth/login'
};

// Interfaces según la estructura de la API
export interface Product {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  image: string;
  brand: string;
  rating: number;
  fullDescription: string;
  features: string[];
  applications: string[];
  specifications: {
    presentation: string;
    coverage: string;
    dryingTime: string;
    colors: string;
    [key: string]: string;
  };
}

export interface Project {
  _id?: string;
  id?: string;
  // Campos obligatorios
  titulo: string;
  ubicacion: string;
  categoria: string;
  estado: string;
  cliente: string;
  duracion: string;
  area: string;
  equipo: string;
  descripcionCorta: string;
  // Campos opcionales
  fecha?: string;
  urlImagen?: string;
  descripcionCompleta?: string;
  desafios?: string;
  soluciones?: string;
  resultados?: string;
  productosUtilizados?: string;
}

// Obtener token del localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('impertula_token');
};

// ==================== API DE PRODUCTOS ====================

export const productApi = {
  // GET /api/products - Listar todos los productos
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await fetch(API_URLS.products);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      console.log('Products API response:', data);
      
      // Si la respuesta es un array, devolverlo directamente
      if (Array.isArray(data)) {
        return data;
      }
      
      // Si la respuesta es un objeto con una propiedad que contiene el array
      if (data && typeof data === 'object') {
        return data.data || data.products || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error en productApi.getAll:', error);
      throw error;
    }
  },

  // GET /api/products/:id - Obtener producto por ID
  getById: async (id: string): Promise<Product> => {
    try {
      const response = await fetch(`${API_URLS.products}/${id}`);
      if (!response.ok) throw new Error('Error al obtener producto');
      const result = await response.json();
      console.log('Product detail API response:', result);
      
      // La API devuelve { success: true, data: {...} }
      // Extraemos solo la propiedad data
      return result.data || result;
    } catch (error) {
      console.error('Error en productApi.getById:', error);
      throw error;
    }
  },

  // POST /api/products - Crear producto (requiere token)
  create: async (product: Omit<Product, '_id' | 'id'>): Promise<Product> => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No hay token de autenticación');

      const response = await fetch(API_URLS.products, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear producto');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en productApi.create:', error);
      throw error;
    }
  },

  // PUT /api/products/:id - Actualizar producto (requiere token)
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No hay token de autenticación');

      const response = await fetch(`${API_URLS.products}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar producto');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en productApi.update:', error);
      throw error;
    }
  },

  // DELETE /api/products/:id - Eliminar producto (requiere token)
  delete: async (id: string): Promise<void> => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No hay token de autenticación');

      const response = await fetch(`${API_URLS.products}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error en productApi.delete:', error);
      throw error;
    }
  }
};

// ==================== API DE PROYECTOS ====================

export const projectApi = {
  // GET /api/proyectos - Obtener todos los proyectos
  getAll: async (): Promise<Project[]> => {
    try {
      const response = await fetch(API_URLS.projects);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Error al obtener proyectos');
      }
      const data = await response.json();
      console.log('Projects API response:', data);
      
      // Si la respuesta es un array, devolverlo directamente
      if (Array.isArray(data)) {
        return data;
      }
      
      // Si la respuesta es un objeto con una propiedad que contiene el array
      if (data && typeof data === 'object') {
        return data.data || data.proyectos || data.projects || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error en projectApi.getAll:', error);
      throw error;
    }
  },

  // GET /api/proyectos/:id - Obtener un proyecto por ID
  getById: async (id: string): Promise<Project> => {
    try {
      const response = await fetch(`${API_URLS.projects}/${id}`);
      if (!response.ok) throw new Error('Error al obtener proyecto');
      const result = await response.json();
      console.log('Project detail API response:', result);
      
      // La API devuelve { success: true, data: {...} }
      // Extraemos solo la propiedad data
      return result.data || result;
    } catch (error) {
      console.error('Error en projectApi.getById:', error);
      throw error;
    }
  },

  // POST /api/proyectos - Crear un nuevo proyecto (requiere token)
  create: async (project: Omit<Project, '_id' | 'id'>): Promise<Project> => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No hay token de autenticación');

      const response = await fetch(API_URLS.projects, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(project)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear proyecto');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en projectApi.create:', error);
      throw error;
    }
  },

  // PUT /api/proyectos/:id - Actualizar un proyecto (requiere token)
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No hay token de autenticación');

      const response = await fetch(`${API_URLS.projects}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(project)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar proyecto');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en projectApi.update:', error);
      throw error;
    }
  },

  // DELETE /api/proyectos/:id - Eliminar un proyecto (requiere token)
  delete: async (id: string): Promise<void> => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No hay token de autenticación');

      const response = await fetch(`${API_URLS.projects}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar proyecto');
      }
    } catch (error) {
      console.error('Error en projectApi.delete:', error);
      throw error;
    }
  },

  // GET /api/proyectos/estado/:estado - Filtrar proyectos por estado
  getByStatus: async (estado: string): Promise<Project[]> => {
    try {
      const response = await fetch(`${API_URLS.projects}/estado/${estado}`);
      if (!response.ok) throw new Error('Error al filtrar proyectos por estado');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en projectApi.getByStatus:', error);
      throw error;
    }
  },

  // GET /api/proyectos/categoria/:categoria - Filtrar proyectos por categoría
  getByCategory: async (categoria: string): Promise<Project[]> => {
    try {
      const response = await fetch(`${API_URLS.projects}/categoria/${categoria}`);
      if (!response.ok) throw new Error('Error al filtrar proyectos por categoría');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en projectApi.getByCategory:', error);
      throw error;
    }
  }
};
