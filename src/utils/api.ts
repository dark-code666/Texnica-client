import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://localhost:7123/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Roles API
export const rolesApi = {
  getAll: () => api.get('/roles'),
  getById: (id: number) => api.get(`/roles/${id}`),
  create: (data: any) => api.post('/roles', data),
  update: (id: number, data: any) => api.put(`/roles/${id}`, data),
  delete: (id: number) => api.delete(`/roles/${id}`),
  assignPermissions: (roleId: number, permissionIds: number[]) => 
    api.post(`/roles/${roleId}/permissions`, permissionIds),
};

// Permissions API
export const permissionsApi = {
  getAll: () => api.get('/permissions'),
  getByModule: (module: string) => api.get(`/permissions/module/${module}`),
  getById: (id: number) => api.get(`/permissions/${id}`),
  create: (data: any) => api.post('/permissions', data),
  delete: (id: number) => api.delete(`/permissions/${id}`),
};

// User Role Assignment API
export const userRoleApi = {
  assignRole: (userId: number, roleId: number) => 
    api.post('/auth/assign-role', { userId, roleId }),
};

// Users API
export const usersApi = {
  getAll: () => api.get('/auth/users'),
};


// FGPO API
export const fgpoApi = {
  getAll: () => api.get('/fgpo'),
  getById: (id: number) => api.get(`/fgpo/${id}`),
  create: (data: any) => api.post('/fgpo', data),
  update: (id: number, data: any) => api.put(`/fgpo/${id}`, data),
  delete: (id: number) => api.delete(`/fgpo/${id}`),
  search: (term: string) => api.get('/fgpo/search', { params: { term } }),
  getPaged: (params: any) => api.get('/fgpo/paged', { params }),
};

// Customers API
export const customersApi = {
  getAll: () => api.get('/customers'),
  getById: (id: number) => api.get(`/customers/${id}`),
  create: (data: any) => api.post('/customers', data),
  update: (id: number, data: any) => api.put(`/customers/${id}`, data),
  delete: (id: number) => api.delete(`/customers/${id}`),
  search: (term: string) => api.get('/customers/search', { params: { term } }),
  getPaged: (params: any) => api.get('/customers/paged', { params }),
};

// Factories API
export const factoriesApi = {
  getAll: () => api.get('/factories'),
  getById: (id: number) => api.get(`/factories/${id}`),
  create: (data: any) => api.post('/factories', data),
  update: (id: number, data: any) => api.put(`/factories/${id}`, data),
  delete: (id: number) => api.delete(`/factories/${id}`),
  search: (term: string) => api.get('/factories/search', { params: { term } }),
  getPaged: (params: any) => api.get('/factories/paged', { params }),
};

// Fabric Requirements API
export const fabricRequirementsApi = {
  getAll: () => api.get('/fabric-requirements'),
  getById: (id: number) => api.get(`/fabric-requirements/${id}`),
  getByFgpo: (fgpoId: number) => api.get(`/fabric-requirements/fgpo/${fgpoId}`),
  create: (data: any) => api.post('/fabric-requirements', data),
  update: (id: number, data: any) => api.put(`/fabric-requirements/${id}`, data),
  delete: (id: number) => api.delete(`/fabric-requirements/${id}`),
  getPaged: (params: any) => api.get('/fabric-requirements/paged', { params }),
};

// Fabric PO API
export const fabricPOsApi = {
  getAll: () => api.get('/fabric-pos'),
  getById: (id: number) => api.get(`/fabric-pos/${id}`),
  create: (data: any) => api.post('/fabric-pos', data),
  update: (id: number, data: any) => api.put(`/fabric-pos/${id}`, data),
  delete: (id: number) => api.delete(`/fabric-pos/${id}`),
  getPaged: (params: any) => api.get('/fabric-pos/paged', { params }),
};

// Mill Production API
export const millProductionsApi = {
  getAll: () => api.get('/mill-productions'),
  getById: (id: number) => api.get(`/mill-productions/${id}`),
  getByFabricPO: (fabricPOId: number) => api.get(`/mill-productions/fabric-po/${fabricPOId}`),
  getByFgpo: (fgpoId: number) => api.get(`/mill-productions/fgpo/${fgpoId}`),
  create: (data: any) => api.post('/mill-productions', data),
  update: (id: number, data: any) => api.put(`/mill-productions/${id}`, data),
  delete: (id: number) => api.delete(`/mill-productions/${id}`),
  getPaged: (params: any) => api.get('/mill-productions/paged', { params }),
};

// Mill Test API
export const millTestsApi = {
  getAll: () => api.get('/mill-tests'),
  getById: (id: number) => api.get(`/mill-tests/${id}`),
  getByFabricPO: (fabricPOId: number) => api.get(`/mill-tests/fabric-po/${fabricPOId}`),
  getByFgpo: (fgpoId: number) => api.get(`/mill-tests/fgpo/${fgpoId}`),
  create: (data: any) => api.post('/mill-tests', data),
  update: (id: number, data: any) => api.put(`/mill-tests/${id}`, data),
  delete: (id: number) => api.delete(`/mill-tests/${id}`),
  getPaged: (params: any) => api.get('/mill-tests/paged', { params }),
};

// Fabric Shipment API
export const fabricShipmentsApi = {
  getAll: () => api.get('/fabric-shipments'),
  getById: (id: number) => api.get(`/fabric-shipments/${id}`),
  getByFabricPO: (fabricPOId: number) => api.get(`/fabric-shipments/fabric-po/${fabricPOId}`),
  getByFgpo: (fgpoId: number) => api.get(`/fabric-shipments/fgpo/${fgpoId}`),
  getByLot: (lotNumber: string) => api.get(`/fabric-shipments/lot/${lotNumber}`),
  create: (data: any) => api.post('/fabric-shipments', data),
  update: (id: number, data: any) => api.put(`/fabric-shipments/${id}`, data),
  delete: (id: number) => api.delete(`/fabric-shipments/${id}`),
  getPaged: (params: any) => api.get('/fabric-shipments/paged', { params }),
};

// Auth API
export const authApi = {
  login: (userName: string, password: string) => 
    api.post('/auth/login', { userName, password }),
  register: (userName: string, userEmail: string, password: string) => 
    api.post('/auth/register', { userName, userEmail, password }),
  changePassword: (currentPassword: string, newPassword: string) => 
    api.post('/auth/change-password', { currentPassword, newPassword }),
  changePasswordFirstLogin: (newPassword: string) => 
    api.post('/auth/change-password', { currentPassword: '', newPassword }),

};

// Catalogs API (UOM, FabricComponent, Statuses, etc.)
export const catalogsApi = {
  getAll: () => api.get('/catalogs'),
  getByType: (type: string) => api.get(`/catalogs/${type}`),
};



export default api;
