import { useResource } from '../useResource';
import { cuttingControlsApi } from '../../utils/api';
import { CuttingControl } from '../../types';

const mapCuttingControl = (raw: any): CuttingControl => ({
  id: raw.id ?? raw.ID ?? 0,
  cutDate: raw.cutDate ?? raw.CutDate ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  sizeId: raw.sizeId ?? raw.SizeId ?? undefined,
  sizeName: raw.sizeName ?? raw.SizeName ?? '',
  fabricLot: raw.fabricLot ?? raw.FabricLot ?? '',
  markerNumber: raw.markerNumber ?? raw.MarkerNumber ?? '',
  plannedCut: raw.plannedCut ?? raw.PlannedCut ?? 0,
  actualCut: raw.actualCut ?? raw.ActualCut ?? 0,
  goodCut: raw.goodCut ?? raw.GoodCut ?? 0,
  damagedQty: raw.damagedQty ?? raw.DamagedQty ?? 0,
  replacementCut: raw.replacementCut ?? raw.ReplacementCut ?? 0,
  sentToSewing: raw.sentToSewing ?? raw.SentToSewing ?? 0,
  cuttingVariance: raw.cuttingVariance ?? raw.CuttingVariance ?? 0,
  pendingCut: raw.pendingCut ?? raw.PendingCut ?? 0,
  overcutQty: raw.overcutQty ?? raw.OvercutQty ?? 0,
  cutToSewDifference: raw.cutToSewDifference ?? raw.CutToSewDifference ?? 0,
  releaseStatus: raw.releaseStatus ?? raw.ReleaseStatus ?? '',
  responsiblePersonId: raw.responsiblePersonId ?? raw.ResponsiblePersonId ?? undefined,
  responsiblePersonName: raw.responsiblePersonName ?? raw.ResponsiblePersonName ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Cutting Control: consume /api/cutting-controls */
export const useCuttingControls = () =>
  useResource<CuttingControl>(cuttingControlsApi, mapCuttingControl);
