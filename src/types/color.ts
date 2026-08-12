// Color (catálogo de colores)

export interface Color {
  id: number;
  colorName: string;
  dyeMethod?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateColorInput {
  colorName: string;
  dyeMethod?: string;
}
