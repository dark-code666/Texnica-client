import { useResource } from '../useResource';
import { suppliersApi } from '../../utils/api';
import { Supplier } from '../../types';

const mapSupplier = (raw: any): Supplier => ({
  id: raw.id ?? raw.ID ?? 0,
  name: raw.name ?? raw.Name ?? '',
  supplierCode: raw.supplierCode ?? raw.SupplierCode ?? '',
  category: raw.category ?? raw.Category ?? '',
  contact: raw.contact ?? raw.Contact ?? '',
  phone: raw.phone ?? raw.Phone ?? '',
  email: raw.email ?? raw.Email ?? '',
  address: raw.address ?? raw.Address ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Suppliers: consume /api/suppliers */
export const useSuppliers = () =>
  useResource<Supplier>(suppliersApi, mapSupplier);
