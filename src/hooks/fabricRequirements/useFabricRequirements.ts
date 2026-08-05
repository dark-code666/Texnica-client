import { useResource } from '../useResource';
import { fabricRequirementsApi } from '../../utils/api';
import { FabricRequirement } from '../../types';

const mapFabricRequirement = (raw: any): FabricRequirement => ({
  id: raw.id ?? raw.ID ?? 0,
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  fabricComponent: raw.fabricComponent ?? raw.FabricComponent ?? '',
  fabricDescription: raw.fabricDescription ?? raw.FabricDescription ?? '',
  composition: raw.composition ?? raw.Composition ?? '',
  gsm: raw.gsm ?? raw.GSM ?? 0,
  requiredWidth: raw.requiredWidth ?? raw.RequiredWidth ?? '',
  uom: raw.uom ?? raw.UOM ?? '',
  orderQuantity: raw.orderQuantity ?? raw.OrderQuantity ?? 0,
  approvedYield: raw.approvedYield ?? raw.ApprovedYield ?? 0,
  grossRequirement: raw.grossRequirement ?? raw.GrossRequirement ?? 0,
  allowancePercentage: raw.allowancePercentage ?? raw.AllowancePercentage ?? 0,
  allowanceQty: raw.allowanceQty ?? raw.AllowanceQty ?? 0,
  availableInventory: raw.availableInventory ?? raw.AvailableInventory ?? 0,
  netPurchaseRequirement: raw.netPurchaseRequirement ?? raw.NetPurchaseRequirement ?? 0,
  requiredDate: raw.requiredDate ?? raw.RequiredDate ?? '',
  status: raw.status ?? raw.Status ?? '',
  dataOwner: raw.dataOwner ?? raw.DataOwner ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Fabric Requirement: consume /api/fabric-requirements */
export const useFabricRequirements = () =>
  useResource<FabricRequirement>(fabricRequirementsApi, mapFabricRequirement);
