import { useResource } from '../useResource';
import { sewingProductionsApi } from '../../utils/api';
import { SewingProduction } from '../../types';

const mapSewingProduction = (raw: any): SewingProduction => ({
  id: raw.id ?? raw.ID ?? 0,
  productionDate: raw.productionDate ?? raw.ProductionDate ?? '',
  shift: raw.shift ?? raw.Shift ?? '',
  line: raw.line ?? raw.Line ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  sizeId: raw.sizeId ?? raw.SizeId ?? undefined,
  sizeCode: raw.sizeCode ?? raw.SizeCode ?? '',
  sewingInput: raw.sewingInput ?? raw.SewingInput ?? 0,
  dailyTarget: raw.dailyTarget ?? raw.DailyTarget ?? 0,
  dailyOutput: raw.dailyOutput ?? raw.DailyOutput ?? 0,
  cumulativeOutput: raw.cumulativeOutput ?? raw.CumulativeOutput ?? 0,
  wip: raw.wip ?? raw.Wip ?? 0,
  rework: raw.rework ?? raw.Rework ?? 0,
  reject: raw.reject ?? raw.Reject ?? 0,
  downtimeMinutes: raw.downtimeMinutes ?? raw.DowntimeMinutes ?? 0,
  targetAchievementPct: raw.targetAchievementPct ?? raw.TargetAchievementPct ?? 0,
  sewingVariance: raw.sewingVariance ?? raw.SewingVariance ?? 0,
  pendingSewing: raw.pendingSewing ?? raw.PendingSewing ?? 0,
  overproduction: raw.overproduction ?? raw.Overproduction ?? 0,
  topStatus: raw.topStatus ?? raw.TopStatus ?? '',
  supervisorId: raw.supervisorId ?? raw.SupervisorId ?? undefined,
  supervisorName: raw.supervisorName ?? raw.SupervisorName ?? '',
  remarks: raw.remarks ?? raw.Remarks ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useSewingProductions = () => useResource<SewingProduction>(sewingProductionsApi, mapSewingProduction);
