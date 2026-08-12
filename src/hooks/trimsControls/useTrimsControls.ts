import { useResource } from '../useResource';
import { trimsControlsApi } from '../../utils/api';
import { TrimsControl } from '../../types';

const mapTrimsControl = (raw: any): TrimsControl => ({
  id: raw.id ?? raw.ID ?? 0,
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  trimType: raw.trimType ?? raw.TrimType ?? '',
  description: raw.description ?? raw.Description ?? '',
  supplierId: raw.supplierId ?? raw.SupplierId ?? undefined,
  supplierName: raw.supplierName ?? raw.SupplierName ?? '',
  uom: raw.uom ?? raw.Uom ?? '',
  consumptionPerGarment: raw.consumptionPerGarment ?? raw.ConsumptionPerGarment ?? 0,
  requiredQty: raw.requiredQty ?? raw.RequiredQty ?? 0,
  orderedQty: raw.orderedQty ?? raw.OrderedQty ?? 0,
  receivedQty: raw.receivedQty ?? raw.ReceivedQty ?? 0,
  approvedQty: raw.approvedQty ?? raw.ApprovedQty ?? 0,
  rejectedQty: raw.rejectedQty ?? raw.RejectedQty ?? 0,
  reservedQty: raw.reservedQty ?? raw.ReservedQty ?? 0,
  issuedQty: raw.issuedQty ?? raw.IssuedQty ?? 0,
  availableQty: raw.availableQty ?? raw.AvailableQty ?? 0,
  shortageQty: raw.shortageQty ?? raw.ShortageQty ?? 0,
  availabilityStatus: raw.availabilityStatus ?? raw.AvailabilityStatus ?? '',
  eta: raw.eta ?? raw.Eta ?? '',
  developmentStatus: raw.developmentStatus ?? raw.DevelopmentStatus ?? '',
  approvalStatus: raw.approvalStatus ?? raw.ApprovalStatus ?? '',
  dataOwner: raw.dataOwner ?? raw.DataOwner ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useTrimsControls = () => useResource<TrimsControl>(trimsControlsApi, mapTrimsControl);
