import { useResource } from '../useResource';
import { fgpoApi } from '../../utils/api';
import { Fgpo } from '../../types';

const mapFgpo = (raw: any): Fgpo => ({
  id: raw.id ?? raw.ID ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  temporaryNumber: raw.temporaryNumber ?? raw.TemporaryNumber ?? '',
  status: raw.status ?? raw.Status ?? '',
  customerId: raw.customerId ?? raw.CustomerId ?? 0,
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  orderQuantity: raw.orderQuantity ?? raw.OrderQuantity ?? 0,
  deliveryDate: raw.deliveryDate ?? raw.DeliveryDate ?? '',
  inTransitQty: raw.inTransitQty ?? raw.InTransitQty ?? 0,
  receivedQty: raw.receivedQty ?? raw.ReceivedQty ?? 0,
  totalShippedQty: raw.totalShippedQty ?? raw.TotalShippedQty ?? 0,
  shipmentVariance: raw.shipmentVariance ?? raw.ShipmentVariance ?? 0,
  pendingToShip: raw.pendingToShip ?? raw.PendingToShip ?? 0,
  overshipmentQty: raw.overshipmentQty ?? raw.OvershipmentQty ?? 0,
  producedQty: raw.producedQty ?? raw.ProducedQty ?? 0,
  productionVariance: raw.productionVariance ?? raw.ProductionVariance ?? 0,
  pendingProduction: raw.pendingProduction ?? raw.PendingProduction ?? 0,
  overproductionQty: raw.overproductionQty ?? raw.OverproductionQty ?? 0,
  dataOwner: raw.dataOwner ?? raw.DataOwner ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de FGPO Master: consume /api/fgpo */
export const useFgpos = () =>
  useResource<Fgpo>(fgpoApi, mapFgpo);
