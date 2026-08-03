import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7123/api',
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


export default api;
