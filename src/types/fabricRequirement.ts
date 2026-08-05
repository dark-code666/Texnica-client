// Fabric Requirement

export interface FabricRequirement {
  id: number;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  fabricComponent?: string;
  fabricDescription?: string;
  composition?: string;
  gsm: number;
  requiredWidth?: string;
  uom?: string;
  orderQuantity: number;
  approvedYield: number;
  grossRequirement: number;
  allowancePercentage: number;
  allowanceQty: number;
  availableInventory: number;
  netPurchaseRequirement: number;
  requiredDate: string;
  status?: string;
  dataOwner?: string;
  remarks?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFabricRequirementInput {
  fgpoId: number;
  style?: string;
  color?: string;
  fabricComponent?: string;
  fabricDescription?: string;
  composition?: string;
  gsm: number;
  requiredWidth?: string;
  uom?: string;
  orderQuantity: number;
  approvedYield: number;
  allowancePercentage: number;
  availableInventory: number;
  requiredDate: string;
  status?: string;
  dataOwner?: string;
  remarks?: string;
}
