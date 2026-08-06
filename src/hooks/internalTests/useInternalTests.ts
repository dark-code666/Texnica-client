import { useResource } from '../useResource';
import { internalTestsApi } from '../../utils/api';
import { InternalTest } from '../../types';

const mapInternalTest = (raw: any): InternalTest => ({
  id: raw.id ?? raw.ID ?? 0,
  testDate: raw.testDate ?? raw.TestDate ?? '',
  fabricPOId: raw.fabricPOId ?? raw.FabricPOId ?? 0,
  fabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  supplier: raw.supplier ?? raw.Supplier ?? '',
  lotNumber: raw.lotNumber ?? raw.LotNumber ?? '',
  lotId: raw.lotId ?? raw.LotId,
  color: raw.color ?? raw.Color ?? '',
  actualWidth: raw.actualWidth ?? raw.ActualWidth ?? 0,
  specimenAreaCm2: raw.specimenAreaCm2 ?? raw.SpecimenAreaCm2 ?? 0,
  weightBeforeG: raw.weightBeforeG ?? raw.WeightBeforeG ?? 0,
  weightAfterG: raw.weightAfterG ?? raw.WeightAfterG ?? 0,
  targetGSM: raw.targetGSM ?? raw.TargetGSM ?? 0,
  gsmBefore: raw.gsmBefore ?? raw.GsmBefore ?? 0,
  gsmAfter: raw.gsmAfter ?? raw.GsmAfter ?? 0,
  gsmVariancePct: raw.gsmVariancePct ?? raw.GsmVariancePct ?? 0,
  lengthBefore: raw.lengthBefore ?? raw.LengthBefore ?? 0,
  lengthAfter: raw.lengthAfter ?? raw.LengthAfter ?? 0,
  lengthShrinkagePct: raw.lengthShrinkagePct ?? raw.LengthShrinkagePct ?? 0,
  widthBefore: raw.widthBefore ?? raw.WidthBefore ?? 0,
  widthAfter: raw.widthAfter ?? raw.WidthAfter ?? 0,
  widthShrinkagePct: raw.widthShrinkagePct ?? raw.WidthShrinkagePct ?? 0,
  torquePct: raw.torquePct ?? raw.TorquePct ?? 0,
  bowingPct: raw.bowingPct ?? raw.BowingPct ?? 0,
  skewingPct: raw.skewingPct ?? raw.SkewingPct ?? 0,
  shadeResult: raw.shadeResult ?? raw.ShadeResult ?? '',
  washAppearance: raw.washAppearance ?? raw.WashAppearance ?? '',
  handFeel: raw.handFeel ?? raw.HandFeel ?? '',
  testResult: raw.testResult ?? raw.TestResult ?? '',
  testedBy: raw.testedBy ?? raw.TestedBy ?? '',
  approvedBy: raw.approvedBy ?? raw.ApprovedBy ?? '',
  reportLink: raw.reportLink ?? raw.ReportLink ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Internal Test: consume /api/internal-tests */
export const useInternalTests = () =>
  useResource<InternalTest>(internalTestsApi, mapInternalTest);
