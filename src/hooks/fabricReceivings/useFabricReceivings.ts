import { useResource } from '../useResource';
import { fabricReceivingsApi } from '../../utils/api';
import { FabricReceiving } from '../../types';

const mapFabricReceiving = (raw: any): FabricReceiving => ({
  id: raw.id ?? raw.ID ?? 0,
  receivingNumber: raw.receivingNumber ?? raw.ReceivingNumber ?? '',
  receivingDate: raw.receivingDate ?? raw.ReceivingDate ?? '',
  shipmentNumber: raw.shipmentNumber ?? raw.ShipmentNumber ?? '',
  fabricPOId: raw.fabricPOId ?? raw.FabricPOId ?? 0,
  fabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  supplier: raw.supplier ?? raw.Supplier ?? '',
  packingListQty: raw.packingListQty ?? raw.PackingListQty ?? 0,
  actualReceivedQty: raw.actualReceivedQty ?? raw.ActualReceivedQty ?? 0,
  receivingVariance: raw.receivingVariance ?? raw.ReceivingVariance ?? 0,
  receivingShortage: raw.receivingShortage ?? raw.ReceivingShortage ?? 0,
  receivingOverQty: raw.receivingOverQty ?? raw.ReceivingOverQty ?? 0,
  expectedRolls: raw.expectedRolls ?? raw.ExpectedRolls ?? 0,
  receivedRolls: raw.receivedRolls ?? raw.ReceivedRolls ?? 0,
  missingRolls: raw.missingRolls ?? raw.MissingRolls ?? 0,
  receivingStatus: raw.receivingStatus ?? raw.ReceivingStatus ?? '',
  warehouseLocation: raw.warehouseLocation ?? raw.WarehouseLocation ?? '',
  receivedBy: raw.receivedBy ?? raw.ReceivedBy ?? '',
  dataOwner: raw.dataOwner ?? raw.DataOwner ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Fabric Receiving: consume /api/fabric-receivings */
export const useFabricReceivings = () =>
  useResource<FabricReceiving>(fabricReceivingsApi, mapFabricReceiving);
