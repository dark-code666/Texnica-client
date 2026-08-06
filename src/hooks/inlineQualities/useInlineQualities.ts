import { useResource } from '../useResource';
import { inlineQualitiesApi } from '../../utils/api';
import { InlineQuality } from '../../types';

const mapInlineQuality = (raw: any): InlineQuality => ({
  id: raw.id ?? raw.ID ?? 0,
  inspectionDate: raw.inspectionDate ?? raw.InspectionDate ?? '',
  time: raw.time ?? raw.Time ?? '',
  line: raw.line ?? raw.Line ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  operation: raw.operation ?? raw.Operation ?? '',
  operator: raw.operator ?? raw.Operator ?? '',
  checkedQty: raw.checkedQty ?? raw.CheckedQty ?? 0,
  criticalDefects: raw.criticalDefects ?? raw.CriticalDefects ?? 0,
  majorDefects: raw.majorDefects ?? raw.MajorDefects ?? 0,
  minorDefects: raw.minorDefects ?? raw.MinorDefects ?? 0,
  totalDefects: raw.totalDefects ?? raw.TotalDefects ?? 0,
  dhuPct: raw.dhuPct ?? raw.DhuPct ?? 0,
  defectivePieces: raw.defectivePieces ?? raw.DefectivePieces ?? 0,
  defectiveRatePct: raw.defectiveRatePct ?? raw.DefectiveRatePct ?? 0,
  maxAllowed: raw.maxAllowed ?? raw.MaxAllowed ?? 0,
  result: raw.result ?? raw.Result ?? '',
  inspector: raw.inspector ?? raw.Inspector ?? '',
  immediateCorrection: raw.immediateCorrection ?? raw.ImmediateCorrection ?? '',
  rootCause: raw.rootCause ?? raw.RootCause ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Inline Quality: consume /api/inline-qualities */
export const useInlineQualities = () =>
  useResource<InlineQuality>(inlineQualitiesApi, mapInlineQuality);
