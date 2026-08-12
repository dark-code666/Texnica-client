// TOP Sample (Top-of-Production Sample — muestra de arranque de línea)

export interface TopSample {
  id: number;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  size?: string;
  productionLine?: string;
  fabricLot?: string;
  cutLotBundle?: string;
  trimVersion?: string;
  threadLot?: string;
  topQty: number;
  productionDate?: string;
  measurementResult?: string;
  constructionResult?: string;
  workmanshipResult?: string;
  labelResult?: string;
  packingResult?: string;
  internalReview?: string;
  customerReview?: string;
  correctiveAction?: string;
  approvalDate?: string;
  approvedBy?: string;
  status?: string;
  documentLink?: string;
  photoLink?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTopSampleInput {
  fgpoId: number;
  size?: string;
  productionLine?: string;
  fabricLot?: string;
  cutLotBundle?: string;
  trimVersion?: string;
  threadLot?: string;
  topQty: number;
  productionDate?: string;
  measurementResult?: string;
  constructionResult?: string;
  workmanshipResult?: string;
  labelResult?: string;
  packingResult?: string;
  internalReview?: string;
  customerReview?: string;
  correctiveAction?: string;
  approvalDate?: string;
  approvedBy?: string;
  status?: string;
  documentLink?: string;
  photoLink?: string;
}
