import { useResource } from '../useResource';
import { fabricInventoriesApi } from '../../utils/api';
import { FabricInventory } from '../../types';

const mapFabricInventory = (raw: any): FabricInventory => ({
  id: raw.id ?? raw.ID ?? 0,
  fabricPOId: raw.fabricPOId ?? raw.FabricPOId ?? 0,
  fabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  componentId: raw.componentId ?? raw.ComponentId ?? undefined,
  componentCode: raw.componentCode ?? raw.ComponentCode ?? '',
  lotId: raw.lotId ?? raw.LotId ?? undefined,
  lotNumber: raw.lotNumber ?? raw.LotNumber ?? '',
  uom: raw.uom ?? raw.UOM ?? '',
  receivedQuantity: raw.receivedQuantity ?? raw.ReceivedQuantity ?? 0,
  approvedQuantity: raw.approvedQuantity ?? raw.ApprovedQuantity ?? 0,
  rejectedQuantity: raw.rejectedQuantity ?? raw.RejectedQuantity ?? 0,
  holdQuantity: raw.holdQuantity ?? raw.HoldQuantity ?? 0,
  reservedQuantity: raw.reservedQuantity ?? raw.ReservedQuantity ?? 0,
  issuedQuantity: raw.issuedQuantity ?? raw.IssuedQuantity ?? 0,
  returnedQuantity: raw.returnedQuantity ?? raw.ReturnedQuantity ?? 0,
  availableQuantity: raw.availableQuantity ?? raw.AvailableQuantity ?? 0,
  shortageQuantity: raw.shortageQuantity ?? raw.ShortageQuantity ?? 0,
  warehouseLocation: raw.warehouseLocation ?? raw.WarehouseLocation ?? '',
  inventoryStatus: raw.inventoryStatus ?? raw.InventoryStatus ?? '',
  dataOwnerId: raw.dataOwnerId ?? raw.DataOwnerId ?? undefined,
  dataOwnerName: raw.dataOwnerName ?? raw.DataOwnerName ?? '',
  lastUpdated: raw.lastUpdated ?? raw.LastUpdated ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Fabric Inventory: consume /api/fabric-inventories */
export const useFabricInventories = () =>
  useResource<FabricInventory>(fabricInventoriesApi, mapFabricInventory);
