import { useResource } from '../useResource';
import { shadeMatchesApi } from '../../utils/api';
import { ShadeMatch } from '../../types';

const mapShadeMatch = (raw: any): ShadeMatch => ({
  id: raw.id ?? raw.ID ?? 0,
  reviewDate: raw.reviewDate ?? raw.ReviewDate ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  bodyFabricLot: raw.bodyFabricLot ?? raw.BodyFabricLot ?? '',
  ribLot: raw.ribLot ?? raw.RibLot ?? '',
  shoulderTapeLot: raw.shoulderTapeLot ?? raw.ShoulderTapeLot ?? '',
  bodyShadeGroup: raw.bodyShadeGroup ?? raw.BodyShadeGroup ?? '',
  ribShadeGroup: raw.ribShadeGroup ?? raw.RibShadeGroup ?? '',
  tapeShadeGroup: raw.tapeShadeGroup ?? raw.TapeShadeGroup ?? '',
  bodyVsRib: raw.bodyVsRib ?? raw.BodyVsRib ?? '',
  bodyVsTape: raw.bodyVsTape ?? raw.BodyVsTape ?? '',
  lightSource: raw.lightSource ?? raw.LightSource ?? '',
  beforeWashResult: raw.beforeWashResult ?? raw.BeforeWashResult ?? '',
  afterWashResult: raw.afterWashResult ?? raw.AfterWashResult ?? '',
  overallResult: raw.overallResult ?? raw.OverallResult ?? '',
  approvedBy: raw.approvedBy ?? raw.ApprovedBy ?? '',
  reportLink: raw.reportLink ?? raw.ReportLink ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Shade Match: consume /api/shade-matches */
export const useShadeMatches = () =>
  useResource<ShadeMatch>(shadeMatchesApi, mapShadeMatch);
