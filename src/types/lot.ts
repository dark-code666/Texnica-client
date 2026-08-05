// Lot (lote de producción)

export interface Lot {
  id: number;
  lotNumber: string;
  fabricPOId: number;
  fabricPONumber: string;
  fgpoId: number;
  fgpoNumber: string;
  producedQuantity: number;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}
