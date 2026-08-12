// FgpoLine (línea de PO: style + color + size + cantidad)

export interface FgpoLine {
  id: number;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  styleId: number;
  styleCode: string;
  colorId: number;
  colorName: string;
  sizeId: number;
  sizeCode: string;
  quantity: number;
  unitPrice?: number;
  totalValue: number;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFgpoLineInput {
  fgpoId: number;
  styleId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
  unitPrice?: number;
}
