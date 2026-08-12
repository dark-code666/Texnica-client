import { useResource } from '../useResource';
import { productionReadinessApi } from '../../utils/api';
import { ProductionReadiness } from '../../types';

const mapProductionReadiness = (raw: any): ProductionReadiness => ({
  id: raw.id ?? raw.ID ?? 0,
  reviewDate: raw.reviewDate ?? raw.ReviewDate ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  poConfirmed: raw.poConfirmed ?? raw.PoConfirmed ?? '',
  techPackCurrent: raw.techPackCurrent ?? raw.TechPackCurrent ?? '',
  fabricApproved: raw.fabricApproved ?? raw.FabricApproved ?? '',
  trimsApproved: raw.trimsApproved ?? raw.TrimsApproved ?? '',
  trimsAvailable: raw.trimsAvailable ?? raw.TrimsAvailable ?? '',
  ppSampleApproved: raw.ppSampleApproved ?? raw.PpSampleApproved ?? '',
  patternApproved: raw.patternApproved ?? raw.PatternApproved ?? '',
  markerApproved: raw.markerApproved ?? raw.MarkerApproved ?? '',
  fabricWidthConfirmed: raw.fabricWidthConfirmed ?? raw.FabricWidthConfirmed ?? '',
  shrinkageApproved: raw.shrinkageApproved ?? raw.ShrinkageApproved ?? '',
  torqueApproved: raw.torqueApproved ?? raw.TorqueApproved ?? '',
  qualityStandardReady: raw.qualityStandardReady ?? raw.QualityStandardReady ?? '',
  linePlanned: raw.linePlanned ?? raw.LinePlanned ?? '',
  overallResult: raw.overallResult ?? raw.OverallResult ?? '',
  openConditions: raw.openConditions ?? raw.OpenConditions ?? '',
  responsibleOwner: raw.responsibleOwner ?? raw.ResponsibleOwner ?? '',
  dueDate: raw.dueDate ?? raw.DueDate ?? '',
  approvedBy: raw.approvedBy ?? raw.ApprovedBy ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Production Readiness: consume /api/production-readiness */
export const useProductionReadiness = () =>
  useResource<ProductionReadiness>(productionReadinessApi, mapProductionReadiness);
