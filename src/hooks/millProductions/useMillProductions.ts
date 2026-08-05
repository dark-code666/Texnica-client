import { useResource } from '../useResource';
import { millProductionsApi } from '../../utils/api';
import { MillProduction } from '../../types';

const mapMillProduction = (raw: any): MillProduction => ({
  id: raw.id ?? raw.ID ?? 0,
  fabricPOId: raw.fabricPOId ?? raw.FabricPOId ?? 0,
  fabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  supplier: raw.supplier ?? raw.Supplier ?? '',
  fabricComponent: raw.fabricComponent ?? raw.FabricComponent ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  plannedQuantity: raw.plannedQuantity ?? raw.PlannedQuantity ?? 0,
  producedQuantity: raw.producedQuantity ?? raw.ProducedQuantity ?? 0,
  completionPercentage: raw.completionPercentage ?? raw.CompletionPercentage ?? 0,
  lotNumber: raw.lotNumber ?? raw.LotNumber ?? '',
  lotId: raw.lotId ?? raw.LotId ?? null,
  rollQuantity: raw.rollQuantity ?? raw.RollQuantity ?? 0,
  yardageOrQty: raw.yardageOrQty ?? raw.YardageOrQty ?? 0,
  weight: raw.weight ?? raw.Weight ?? 0,
  startDate: raw.startDate ?? raw.StartDate ?? '',
  finishDate: raw.finishDate ?? raw.FinishDate ?? '',
  plannedExport: raw.plannedExport ?? raw.PlannedExport ?? '',
  actualExport: raw.actualExport ?? raw.ActualExport ?? '',
  status: raw.status ?? raw.Status ?? '',
  dataOwner: raw.dataOwner ?? raw.DataOwner ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Mill Production: consume /api/mill-productions */
export const useMillProductions = () =>
  useResource<MillProduction>(millProductionsApi, mapMillProduction);
