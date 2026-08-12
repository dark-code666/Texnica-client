import { useResource } from '../useResource';
import { cuttingPanelQcsApi } from '../../utils/api';
import { CuttingPanelQc } from '../../types';

const mapCuttingPanelQc = (raw: any): CuttingPanelQc => ({
  id: raw.id ?? raw.ID ?? 0,
  inspectionDate: raw.inspectionDate ?? raw.InspectionDate ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  sizeId: raw.sizeId ?? raw.SizeId ?? undefined,
  sizeName: raw.sizeName ?? raw.SizeName ?? '',
  fabricLot: raw.fabricLot ?? raw.FabricLot ?? '',
  cutLotLay: raw.cutLotLay ?? raw.CutLotLay ?? '',
  bundleNo: raw.bundleNo ?? raw.BundleNo ?? '',
  sampleQty: raw.sampleQty ?? raw.SampleQty ?? 0,
  panelDefects: raw.panelDefects ?? raw.PanelDefects ?? 0,
  notchesDefects: raw.notchesDefects ?? raw.NotchesDefects ?? 0,
  drillMarkDefects: raw.drillMarkDefects ?? raw.DrillMarkDefects ?? 0,
  shadeDefects: raw.shadeDefects ?? raw.ShadeDefects ?? 0,
  measurementDefects: raw.measurementDefects ?? raw.MeasurementDefects ?? 0,
  totalDefects: raw.totalDefects ?? raw.TotalDefects ?? 0,
  defectRatePct: raw.defectRatePct ?? raw.DefectRatePct ?? 0,
  maxAllowed: raw.maxAllowed ?? raw.MaxAllowed ?? 0.02,
  result: raw.result ?? raw.Result ?? '',
  inspectorId: raw.inspectorId ?? raw.InspectorId ?? undefined,
  inspectorName: raw.inspectorName ?? raw.InspectorName ?? '',
  correctiveAction: raw.correctiveAction ?? raw.CorrectiveAction ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Cutting Panel QC: consume /api/cutting-panel-qcs */
export const useCuttingPanelQcs = () =>
  useResource<CuttingPanelQc>(cuttingPanelQcsApi, mapCuttingPanelQc);
