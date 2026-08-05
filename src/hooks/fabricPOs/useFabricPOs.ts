import { useResource } from '../useResource';
import { fabricPOsApi } from '../../utils/api';
import { FabricPO } from '../../types';

const mapFabricPO = (raw: any): FabricPO => ({
  id: raw.id ?? raw.ID ?? 0,
  fabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  fgpos: (raw.fgpos ?? raw.Fgpos ?? []).map((f: any) => ({
    fgpoId: f.fgpoId ?? f.FGPOId ?? 0,
    fgpoNumber: f.fgpoNumber ?? f.FGPONumber ?? '',
    customerName: f.customerName ?? f.CustomerName ?? '',
    style: f.style ?? f.Style ?? '',
    color: f.color ?? f.Color ?? '',
    allocatedQuantity: f.allocatedQuantity ?? f.AllocatedQuantity ?? 0,
  })),
  supplier: raw.supplier ?? raw.Supplier ?? '',
  fabricMill: raw.fabricMill ?? raw.FabricMill ?? '',
  fabricComponent: raw.fabricComponent ?? raw.FabricComponent ?? '',
  orderedQuantity: raw.orderedQuantity ?? raw.OrderedQuantity ?? 0,
  uom: raw.uom ?? raw.UOM ?? '',
  unitPrice: raw.unitPrice ?? raw.UnitPrice ?? 0,
  poAmount: raw.poAmount ?? raw.POAmount ?? 0,
  orderDate: raw.orderDate ?? raw.OrderDate ?? '',
  requiredCompletion: raw.requiredCompletion ?? raw.RequiredCompletion ?? '',
  plannedExport: raw.plannedExport ?? raw.PlannedExport ?? '',
  plannedArrival: raw.plannedArrival ?? raw.PlannedArrival ?? '',
  poStatus: raw.poStatus ?? raw.POStatus ?? '',
  purchaseOwner: raw.purchaseOwner ?? raw.PurchaseOwner ?? '',
  approvedBy: raw.approvedBy ?? raw.ApprovedBy ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Fabric PO: consume /api/fabric-pos */
export const useFabricPOs = () =>
  useResource<FabricPO>(fabricPOsApi, mapFabricPO);
