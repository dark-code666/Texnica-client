import { useResource } from '../useResource';
import { cuttingReleasesApi } from '../../utils/api';
import { CuttingRelease } from '../../types';

const mapCuttingRelease = (raw: any): CuttingRelease => ({
  id: raw.id ?? raw.ID ?? 0,
  releaseNumber: raw.releaseNumber ?? raw.ReleaseNumber ?? '',
  releaseDate: raw.releaseDate ?? raw.ReleaseDate ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  fabricLot: raw.fabricLot ?? raw.FabricLot ?? '',
  approvedCutQty: raw.approvedCutQty ?? raw.ApprovedCutQty ?? 0,
  approvedWidth: raw.approvedWidth ?? raw.ApprovedWidth ?? 0,
  markerNumber: raw.markerNumber ?? raw.MarkerNumber ?? '',
  approvedYield: raw.approvedYield ?? raw.ApprovedYield ?? 0,
  prrResult: raw.prrResult ?? raw.PrrResult ?? '',
  releasedBy: raw.releasedBy ?? raw.ReleasedBy ?? '',
  reviewedBy: raw.reviewedBy ?? raw.ReviewedBy ?? '',
  exception: raw.exception ?? raw.Exception ?? '',
  conditions: raw.conditions ?? raw.Conditions ?? '',
  releaseStatus: raw.releaseStatus ?? raw.ReleaseStatus ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Cutting Release: consume /api/cutting-releases */
export const useCuttingReleases = () =>
  useResource<CuttingRelease>(cuttingReleasesApi, mapCuttingRelease);
