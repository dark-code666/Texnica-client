import { useMemo } from 'react';
import { useResource } from '../useResource';
import { aqlInspectionsApi } from '../../utils/api';
import { AqlInspection } from '../../types';

const mapAqlInspection = (raw: any): AqlInspection => ({
  id: raw.id ?? raw.ID ?? 0,
  inspectionType: raw.inspectionType ?? raw.InspectionType ?? '',
  inspectionDate: raw.inspectionDate ?? raw.InspectionDate ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FgpoNumber ?? raw.FGPONumber ?? '',
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
  inspectorId: raw.inspectorId ?? raw.InspectorId ?? undefined,
  inspectorName: raw.inspectorName ?? raw.InspectorName ?? '',
  disposition: raw.disposition ?? raw.Disposition ?? '',
  reportLink: raw.reportLink ?? raw.ReportLink ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de AQL Inspection: consume /api/aql-inspections (opcionalmente filtrado por tipo) */
export const useAqlInspections = (type?: string) => {
  // IMPORTANTE: memorizar el objeto apiResource para que useResource NO re-dispare
  // la carga en cada render (evita bucle de peticiones / parpadeo de la página).
  const apiResource = useMemo(
    () => ({
      ...aqlInspectionsApi,
      getPaged: (params: any) =>
        aqlInspectionsApi.getPaged({ ...params, ...(type ? { type } : {}) }),
    }),
    [type]
  );
  return useResource<AqlInspection>(apiResource, mapAqlInspection);
};
