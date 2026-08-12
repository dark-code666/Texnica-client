// Trims Control (control de avíos/trim)

export interface TrimsControl {
  id: number;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  trimType?: string;
  description?: string;
  supplierId?: number;
  supplierName?: string;
  uom?: string;
  consumptionPerGarment: number;
  requiredQty: number;
  orderedQty: number;
  receivedQty: number;
  approvedQty: number;
  rejectedQty: number;
  reservedQty: number;
  issuedQty: number;
  availableQty: number;
  shortageQty: number;
  availabilityStatus?: string;
  eta?: string;
  developmentStatus?: string;
  approvalStatus?: string;
  dataOwner?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTrimsControlInput {
  fgpoId: number;
  trimType?: string;
  description?: string;
  supplierId?: number;
  uom?: string;
  consumptionPerGarment: number;
  requiredQty: number;
  orderedQty: number;
  receivedQty: number;
  approvedQty: number;
  rejectedQty: number;
  reservedQty: number;
  issuedQty: number;
  eta?: string;
  developmentStatus?: string;
  approvalStatus?: string;
  dataOwner?: string;
  comments?: string;
}
