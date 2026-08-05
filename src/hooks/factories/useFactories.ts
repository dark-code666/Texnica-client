import { useResource } from '../useResource';
import { factoriesApi } from '../../utils/api';
import { Factory } from '../../types';

const mapFactory = (raw: any): Factory => ({
  id: raw.id ?? raw.ID ?? 0,
  name: raw.name ?? raw.Name ?? '',
  location: raw.location ?? raw.Location ?? '',
  contact: raw.contact ?? raw.Contact ?? '',
  phone: raw.phone ?? raw.Phone ?? '',
  email: raw.email ?? raw.Email ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Factories: consume /api/factories */
export const useFactories = () =>
  useResource<Factory>(factoriesApi, mapFactory);
