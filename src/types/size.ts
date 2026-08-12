// Size (catálogo de tallas)

export interface Size {
  id: number;
  sizeCode: string;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSizeInput {
  sizeCode: string;
  sortOrder: number;
}
