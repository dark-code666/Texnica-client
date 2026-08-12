// Sewing Production (producción de costura)

export interface SewingProduction {
  id: number;
  productionDate: string;
  shift?: string;
  line?: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  sizeId?: number;
  sizeCode?: string;
  sewingInput: number;
  dailyTarget: number;
  dailyOutput: number;
  cumulativeOutput: number;
  wip: number;
  rework: number;
  reject: number;
  downtimeMinutes: number;
  targetAchievementPct: number;
  sewingVariance: number;
  pendingSewing: number;
  overproduction: number;
  topStatus?: string;
  supervisorId?: number;
  supervisorName?: string;
  remarks?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSewingProductionInput {
  productionDate: string;
  shift?: string;
  line?: string;
  fgpoId: number;
  sewingInput: number;
  dailyTarget: number;
  dailyOutput: number;
  cumulativeOutput: number;
  wip: number;
  rework: number;
  reject: number;
  downtimeMinutes: number;
  topStatus?: string;
  supervisorId?: number;
  remarks?: string;
}
