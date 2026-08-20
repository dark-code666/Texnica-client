// Color (catálogo de colores)

export interface Color {
  id: number;
  colorCode?: string;
  alternateCode?: string;
  colorName: string;
  dyeMethod?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateColorInput {
  colorCode?: string;
  alternateCode?: string;
  colorName: string;
  dyeMethod?: string;
}
