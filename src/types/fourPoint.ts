// Four-Point Inspection (inspección de tela por sistema Four-Point)

export interface FourPoint {
  id: number;
  inspectionDate: string;
  receivingId?: number;
  receivingNumber: string;
  fabricPOId: number;
  fabricPONumber: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  supplier?: string;
  lotNumber?: string;
  lotId?: number;
  rollNumber?: string;
  width: number;
  inspectedLength: number;
  points1: number;
  points2: number;
  points3: number;
  points4: number;
  totalPoints: number;
  pointsPer100SqYd: number;
  maxAllowed: number;
  acceptedQty: number;
  rejectedQty: number;
  holdQty: number;
  result?: string;
  inspector?: string;
  reportLink?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFourPointInput {
  inspectionDate: string;
  receivingId?: number;
  fabricPOId: number;
  fgpoId: number;
  lotNumber?: string;
  rollNumber?: string;
  width: number;
  inspectedLength: number;
  points1: number;
  points2: number;
  points3: number;
  points4: number;
  maxAllowed: number;
  acceptedQty: number;
  rejectedQty: number;
  holdQty: number;
  inspector?: string;
  reportLink?: string;
  comments?: string;
}
