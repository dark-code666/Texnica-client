// Cutting Release (liberación de tela aprobada para corte)

export interface CuttingRelease {
  id: number;
  releaseNumber: string;
  releaseDate: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  fabricLot?: string;
  approvedCutQty: number;
  approvedWidth: number;
  markerNumber?: string;
  approvedYield: number;
  prrResult?: string;
  releasedBy?: string;
  reviewedBy?: string;
  exception?: string;
  conditions?: string;
  releaseStatus?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCuttingReleaseInput {
  releaseDate: string;
  fgpoId: number;
  fabricLot?: string;
  approvedCutQty: number;
  approvedWidth: number;
  markerNumber?: string;
  approvedYield: number;
  prrResult?: string;
  releasedBy?: string;
  reviewedBy?: string;
  exception?: string;
  conditions?: string;
  releaseStatus?: string;
  comments?: string;
}
