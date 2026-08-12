// Price (costing por style + color + size)

export interface Price {
  id: number;
  styleId: number;
  styleCode: string;
  colorId: number;
  colorName: string;
  sizeId: number;
  sizeCode: string;
  sku?: string;
  unitPrice: number;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePriceInput {
  styleId: number;
  colorId: number;
  sizeId: number;
  sku?: string;
  unitPrice: number;
  comments?: string;
}
