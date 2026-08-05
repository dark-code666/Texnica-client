import { useResource } from '../useResource';
import { fabricShipmentsApi } from '../../utils/api';
import { FabricShipment } from '../../types';

const mapFabricShipment = (raw: any): FabricShipment => ({
  id: raw.id ?? raw.ID ?? 0,
  shipmentNumber: raw.shipmentNumber ?? raw.ShipmentNumber ?? '',
  fabricPOId: raw.fabricPOId ?? raw.FabricPOId ?? 0,
  fabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  supplier: raw.supplier ?? raw.Supplier ?? '',
  lotNumber: raw.lotNumber ?? raw.LotNumber ?? '',
  lotId: raw.lotId ?? raw.LotId ?? null,
  rollQty: raw.rollQty ?? raw.RollQty ?? 0,
  shippedQuantity: raw.shippedQuantity ?? raw.ShippedQuantity ?? 0,
  uom: raw.uom ?? raw.UOM ?? '',
  shippedWeight: raw.shippedWeight ?? raw.ShippedWeight ?? 0,
  packingList: raw.packingList ?? raw.PackingList ?? '',
  invoiceNumber: raw.invoiceNumber ?? raw.InvoiceNumber ?? '',
  containerAWB: raw.containerAWB ?? raw.ContainerAWB ?? '',
  shippingMethod: raw.shippingMethod ?? raw.ShippingMethod ?? '',
  etd: raw.etd ?? raw.ETD ?? '',
  eta: raw.eta ?? raw.ETA ?? '',
  shipmentStatus: raw.shipmentStatus ?? raw.ShipmentStatus ?? '',
  deliveredToTexnicaDate: raw.deliveredToTexnicaDate ?? raw.DeliveredToTexnicaDate ?? '',
  inTransitQuantity: raw.inTransitQuantity ?? raw.InTransitQuantity ?? 0,
  remainingToDeliver: raw.remainingToDeliver ?? raw.RemainingToDeliver ?? 0,
  dataOwner: raw.dataOwner ?? raw.DataOwner ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Fabric Shipment: consume /api/fabric-shipments */
export const useFabricShipments = () =>
  useResource<FabricShipment>(fabricShipmentsApi, mapFabricShipment);
