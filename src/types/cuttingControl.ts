// Cutting Control (control de corte por registro)

export interface CuttingControl {
  id: number;
  cutDate: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  sizeId?: number;
  sizeName?: string;
  fabricLot?: string;
  markerNumber?: string;
  plannedCut: number;
  actualCut: number;
  goodCut: number;
  damagedQty: number;
  replacementCut: number;
  sentToSewing: number;
  cuttingVariance: number;
  pendingCut: number;
  overcutQty: number;
  cutToSewDifference: number;
  releaseStatus?: string;
  responsiblePersonId?: number;
  responsiblePersonName?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCuttingControlInput {
  cutDate: string;
  fgpoId: number;
  sizeId?: number;
  fabricLot?: string;
  markerNumber?: string;
  plannedCut: number;
  actualCut: number;
  goodCut: number;
  damagedQty: number;
  replacementCut: number;
  sentToSewing: number;
  releaseStatus?: string;
  responsiblePersonId?: number;
  comments?: string;
}
