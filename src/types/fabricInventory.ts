// Fabric Inventory (inventario de tela por lote)

export interface FabricInventory {
  id: number;
  fabricPOId: number;
  fabricPONumber: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  componentId?: number;
  componentCode?: string;
  lotId?: number;
  lotNumber?: string;
  uom?: string;
  receivedQuantity: number;
  approvedQuantity: number;
  rejectedQuantity: number;
  holdQuantity: number;
  reservedQuantity: number;
  issuedQuantity: number;
  returnedQuantity: number;
  availableQuantity: number;
  shortageQuantity: number;
  warehouseLocation?: string;
  inventoryStatus?: string;
  dataOwnerId?: number;
  dataOwnerName?: string;
  lastUpdated?: string;
  remarks?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFabricInventoryInput {
  fabricPOId: number;
  fgpoId: number;
  lotId?: number | null;
  receivedQuantity: number;
  approvedQuantity: number;
  rejectedQuantity: number;
  holdQuantity: number;
  reservedQuantity: number;
  issuedQuantity: number;
  returnedQuantity: number;
  shortageQuantity: number;
  warehouseLocation?: string;
  inventoryStatus?: string;
  dataOwnerId?: number;
  lastUpdated?: string;
  remarks?: string;
}
