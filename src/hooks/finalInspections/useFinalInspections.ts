import { useResource } from '../useResource';
import { finalInspectionsApi } from '../../utils/api';
import { FinalInspection } from '../../types';

const mapFinalInspection = (raw: any): FinalInspection => ({
  id: raw.id ?? raw.ID ?? 0,
  inspectionDate: raw.inspectionDate ?? raw.InspectionDate ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  lotShipment: raw.lotShipment ?? raw.LotShipment ?? '',
  lotSize: raw.lotSize ?? raw.LotSize ?? 0,
  inspectionLevel: raw.inspectionLevel ?? raw.InspectionLevel ?? '',
  aqlMajor: raw.aqlMajor ?? raw.AqlMajor ?? 0,
  aqlMinor: raw.aqlMinor ?? raw.AqlMinor ?? 0,
  sampleSize: raw.sampleSize ?? raw.SampleSize ?? 0,
  criticalDefects: raw.criticalDefects ?? raw.CriticalDefects ?? 0,
  majorDefects: raw.majorDefects ?? raw.MajorDefects ?? 0,
  minorDefects: raw.minorDefects ?? raw.MinorDefects ?? 0,
  criticalAc: raw.criticalAc ?? raw.CriticalAc ?? 0,
  majorAc: raw.majorAc ?? raw.MajorAc ?? 0,
  minorAc: raw.minorAc ?? raw.MinorAc ?? 0,
  criticalRe: raw.criticalRe ?? raw.CriticalRe ?? 0,
  majorRe: raw.majorRe ?? raw.MajorRe ?? 0,
  minorRe: raw.minorRe ?? raw.MinorRe ?? 0,
  result: raw.result ?? raw.Result ?? '',
  inspector: raw.inspector ?? raw.Inspector ?? '',
  disposition: raw.disposition ?? raw.Disposition ?? '',
  reportLink: raw.reportLink ?? raw.ReportLink ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Final Inspection: consume /api/final-inspections */
export const useFinalInspections = () =>
  useResource<FinalInspection>(finalInspectionsApi, mapFinalInspection);
