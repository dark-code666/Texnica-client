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

// Fabric Receiving API
export const fabricReceivingsApi = {
  getAll: () => api.get('/fabric-receivings'),
  getById: (id: number) => api.get(`/fabric-receivings/${id}`),
  getByFabricPO: (fabricPOId: number) => api.get(`/fabric-receivings/fabric-po/${fabricPOId}`),
  getByFgpo: (fgpoId: number) => api.get(`/fabric-receivings/fgpo/${fgpoId}`),
  create: (data: any) => api.post('/fabric-receivings', data),
  update: (id: number, data: any) => api.put(`/fabric-receivings/${id}`, data),
  delete: (id: number) => api.delete(`/fabric-receivings/${id}`),
  getPaged: (params: any) => api.get('/fabric-receivings/paged', { params }),
};

// Roll Receiving API
export const rollReceivingsApi = {
  getAll: () => api.get('/roll-receivings'),
  getById: (id: number) => api.get(`/roll-receivings/${id}`),
  getByReceiving: (receivingId: number) => api.get(`/roll-receivings/receiving/${receivingId}`),
  create: (data: any) => api.post('/roll-receivings', data),
  update: (id: number, data: any) => api.put(`/roll-receivings/${id}`, data),
  delete: (id: number) => api.delete(`/roll-receivings/${id}`),
  getPaged: (params: any) => api.get('/roll-receivings/paged', { params }),
};

// Four-Point Inspection API
export const fourPointApi = {
  getAll: () => api.get('/four-point'),
  getById: (id: number) => api.get(`/four-point/${id}`),
  getByFabricPO: (fabricPOId: number) => api.get(`/four-point/fabric-po/${fabricPOId}`),
  getByFgpo: (fgpoId: number) => api.get(`/four-point/fgpo/${fgpoId}`),
  getByReceiving: (receivingId: number) => api.get(`/four-point/receiving/${receivingId}`),
  create: (data: any) => api.post('/four-point', data),
  update: (id: number, data: any) => api.put(`/four-point/${id}`, data),
  delete: (id: number) => api.delete(`/four-point/${id}`),
  getPaged: (params: any) => api.get('/four-point/paged', { params }),
};

// Internal Test API
export const internalTestsApi = {
  getAll: () => api.get('/internal-tests'),
  getById: (id: number) => api.get(`/internal-tests/${id}`),
  getByFabricPO: (fabricPOId: number) => api.get(`/internal-tests/fabric-po/${fabricPOId}`),
  getByFgpo: (fgpoId: number) => api.get(`/internal-tests/fgpo/${fgpoId}`),
  create: (data: any) => api.post('/internal-tests', data),
  update: (id: number, data: any) => api.put(`/internal-tests/${id}`, data),
  delete: (id: number) => api.delete(`/internal-tests/${id}`),
  getPaged: (params: any) => api.get('/internal-tests/paged', { params }),
};

// Shade Match API
export const shadeMatchesApi = {
  getAll: () => api.get('/shade-matches'),
  getById: (id: number) => api.get(`/shade-matches/${id}`),
  getByFgpo: (fgpoId: number) => api.get(`/shade-matches/fgpo/${fgpoId}`),
  create: (data: any) => api.post('/shade-matches', data),
  update: (id: number, data: any) => api.put(`/shade-matches/${id}`, data),
  delete: (id: number) => api.delete(`/shade-matches/${id}`),
  getPaged: (params: any) => api.get('/shade-matches/paged', { params }),
};

// Inline Quality API
export const inlineQualitiesApi = {
  getAll: () => api.get('/inline-qualities'),
  getById: (id: number) => api.get(`/inline-qualities/${id}`),
  getByFgpo: (fgpoId: number) => api.get(`/inline-qualities/fgpo/${fgpoId}`),
  getByLine: (line: string) => api.get(`/inline-qualities/line/${line}`),
  create: (data: any) => api.post('/inline-qualities', data),
  update: (id: number, data: any) => api.put(`/inline-qualities/${id}`, data),
  delete: (id: number) => api.delete(`/inline-qualities/${id}`),
  getPaged: (params: any) => api.get('/inline-qualities/paged', { params }),
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
