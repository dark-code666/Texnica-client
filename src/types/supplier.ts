// Proveedores (Suppliers)

export interface Supplier {
  id: number;
  name: string;
  supplierCode?: string;
  category?: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  remarks?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSupplierInput {
  name: string;
  supplierCode?: string;
  category?: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  remarks?: string;
}
