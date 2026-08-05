import { useResource } from '../useResource';
import { millTestsApi } from '../../utils/api';
import { MillTest } from '../../types';

const mapMillTest = (raw: any): MillTest => ({
  id: raw.id ?? raw.ID ?? 0,
  fabricPOId: raw.fabricPOId ?? raw.FabricPOId ?? 0,
  fabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  supplier: raw.supplier ?? raw.Supplier ?? '',
  lotNumber: raw.lotNumber ?? raw.LotNumber ?? '',
  lotId: raw.lotId ?? raw.LotId ?? null,
  color: raw.color ?? raw.Color ?? '',
  rollQty: raw.rollQty ?? raw.RollQty ?? 0,
  actualWidth: raw.actualWidth ?? raw.ActualWidth ?? 0,
  actualGSM: raw.actualGSM ?? raw.ActualGSM ?? 0,
  lengthShrinkagePercentage: raw.lengthShrinkagePercentage ?? raw.LengthShrinkagePercentage ?? 0,
  widthShrinkagePercentage: raw.widthShrinkagePercentage ?? raw.WidthShrinkagePercentage ?? 0,
  torquePercentage: raw.torquePercentage ?? raw.TorquePercentage ?? 0,
  bowingPercentage: raw.bowingPercentage ?? raw.BowingPercentage ?? 0,
  skewingPercentage: raw.skewingPercentage ?? raw.SkewingPercentage ?? 0,
  colorfastness: raw.colorfastness ?? raw.Colorfastness ?? '',
  washAppearance: raw.washAppearance ?? raw.WashAppearance ?? '',
  handFeel: raw.handFeel ?? raw.HandFeel ?? '',
  testDate: raw.testDate ?? raw.TestDate ?? '',
  testedBy: raw.testedBy ?? raw.TestedBy ?? '',
  testResult: raw.testResult ?? raw.TestResult ?? '',
  approvedForExport: raw.approvedForExport ?? raw.ApprovedForExport ?? false,
  reportLink: raw.reportLink ?? raw.ReportLink ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Mill Test: consume /api/mill-tests */
export const useMillTests = () =>
  useResource<MillTest>(millTestsApi, mapMillTest);
