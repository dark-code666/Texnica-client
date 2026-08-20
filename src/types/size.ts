// Size (catálogo de tallas)

export interface Size {
  id: number;
  sizeCode: string;
  description?: string;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSizeInput {
  sizeCode: string;
  description?: string;
  sortOrder: number;
}
