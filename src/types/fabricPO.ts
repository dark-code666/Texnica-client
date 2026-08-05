// Fabric PO

export interface FabricPOFgpoItem {
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  allocatedQuantity: number;
}

export interface FabricPO {
  id: number;
  fabricPONumber: string;
  fgpos: FabricPOFgpoItem[];
  supplier?: string;
  fabricMill?: string;
  fabricComponent?: string;
  orderedQuantity: number;
  uom?: string;
  unitPrice: number;
  poAmount: number;
  orderDate: string;
  requiredCompletion: string;
  plannedExport?: string;
  plannedArrival?: string;
  poStatus?: string;
  purchaseOwner?: string;
  approvedBy?: string;
  remarks?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface FabricPOFgpoInput {
  fgpoId: number;
  style?: string;
  color?: string;
  allocatedQuantity: number;
}

export interface CreateFabricPOInput {
  fabricPONumber: string;
  fgpoItems: FabricPOFgpoInput[];
  supplier?: string;
  fabricMill?: string;
  fabricComponent?: string;
  orderedQuantity: number;
  uom?: string;
  unitPrice: number;
  orderDate: string;
  requiredCompletion: string;
  plannedExport?: string;
  plannedArrival?: string;
  poStatus?: string;
  purchaseOwner?: string;
  approvedBy?: string;
  remarks?: string;
}
