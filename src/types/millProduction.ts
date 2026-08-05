// Mill Production

export interface MillProduction {
  id: number;
  fabricPOId: number;
  fabricPONumber: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  supplier?: string;
  fabricComponent?: string;
  style?: string;
  color?: string;
  plannedQuantity: number;
  producedQuantity: number;
  completionPercentage: number;
  lotNumber?: string;
  lotId?: number | null;
  rollQuantity: number;
  yardageOrQty: number;
  weight: number;
  startDate: string;
  finishDate?: string;
  plannedExport?: string;
  actualExport?: string;
  status?: string;
  dataOwner?: string;
  remarks?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateMillProductionInput {
  fabricPOId: number;
  fgpoId: number;
  supplier?: string;
  fabricComponent?: string;
  style?: string;
  color?: string;
  plannedQuantity: number;
  producedQuantity: number;
  lotNumber?: string;
  rollQuantity: number;
  yardageOrQty: number;
  weight: number;
  startDate: string;
  finishDate?: string;
  plannedExport?: string;
  actualExport?: string;
  status?: string;
  dataOwner?: string;
  remarks?: string;
}
