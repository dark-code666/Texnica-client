import { useResource } from '../useResource';
import { finishedGoodsApi } from '../../utils/api';
import { FinishedGood } from '../../types';

const mapFinishedGood = (raw: any): FinishedGood => ({
  id: raw.id ?? raw.ID ?? 0,
  receiptDate: raw.receiptDate ?? raw.ReceiptDate ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  size: raw.size ?? raw.Size ?? '',
  packedQty: raw.packedQty ?? raw.PackedQty ?? 0,
  warehouseReceived: raw.warehouseReceived ?? raw.WarehouseReceived ?? 0,
  reservedForShipment: raw.reservedForShipment ?? raw.ReservedForShipment ?? 0,
  loadedQty: raw.loadedQty ?? raw.LoadedQty ?? 0,
  shippedQty: raw.shippedQty ?? raw.ShippedQty ?? 0,
  readyToShipQty: raw.readyToShipQty ?? raw.ReadyToShipQty ?? 0,
  warehouseBalance: raw.warehouseBalance ?? raw.WarehouseBalance ?? 0,
  warehouseLocation: raw.warehouseLocation ?? raw.WarehouseLocation ?? '',
  status: raw.status ?? raw.Status ?? '',
  dataOwnerId: raw.dataOwnerId ?? raw.DataOwnerId ?? undefined,
  dataOwnerName: raw.dataOwnerName ?? raw.DataOwnerName ?? '',
  lastUpdated: raw.lastUpdated ?? raw.LastUpdated ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Finished Goods: consume /api/finished-goods */
export const useFinishedGoods = () =>
  useResource<FinishedGood>(finishedGoodsApi, mapFinishedGood);
