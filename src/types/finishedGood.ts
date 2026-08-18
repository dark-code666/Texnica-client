// Finished Goods (mercancía terminada en almacén)

export interface FinishedGood {
  id: number;
  receiptDate: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  size?: string;
  packedQty: number;
  warehouseReceived: number;
  reservedForShipment: number;
  loadedQty: number;
  shippedQty: number;
  readyToShipQty: number;
  warehouseBalance: number;
  warehouseLocation?: string;
  status?: string;
  dataOwnerId?: number;
  dataOwnerName?: string;
  lastUpdated?: string;
  remarks?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFinishedGoodInput {
  receiptDate: string;
  fgpoId: number;
  packedQty: number;
  warehouseReceived: number;
  reservedForShipment: number;
  loadedQty: number;
  shippedQty: number;
  warehouseLocation?: string | null;
  status?: string | null;
  dataOwnerId?: number | null;
  lastUpdated?: string | null;
  remarks?: string | null;
}
