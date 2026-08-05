import { useResource } from '../useResource';
import { customersApi } from '../../utils/api';
import { Customer } from '../../types';

const mapCustomer = (raw: any): Customer => ({
  id: raw.id ?? raw.ID ?? 0,
  name: raw.name ?? raw.Name ?? '',
  contact: raw.contact ?? raw.Contact ?? '',
  phone: raw.phone ?? raw.Phone ?? '',
  email: raw.email ?? raw.Email ?? '',
  address: raw.address ?? raw.Address ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Customers: consume /api/customers */
export const useCustomers = () =>
  useResource<Customer>(customersApi, mapCustomer);
