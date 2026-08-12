// Production Readiness (PRR — revisión de preparación de producción)

export interface ProductionReadiness {
  id: number;
  reviewDate: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  poConfirmed?: string;
  techPackCurrent?: string;
  fabricApproved?: string;
  trimsApproved?: string;
  trimsAvailable?: string;
  ppSampleApproved?: string;
  patternApproved?: string;
  markerApproved?: string;
  fabricWidthConfirmed?: string;
  shrinkageApproved?: string;
  torqueApproved?: string;
  qualityStandardReady?: string;
  linePlanned?: string;
  overallResult?: string;
  openConditions?: string;
  responsibleOwner?: string;
  dueDate?: string;
  approvedBy?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateProductionReadinessInput {
  reviewDate: string;
  fgpoId: number;
  poConfirmed?: string;
  techPackCurrent?: string;
  fabricApproved?: string;
  trimsApproved?: string;
  trimsAvailable?: string;
  ppSampleApproved?: string;
  patternApproved?: string;
  markerApproved?: string;
  fabricWidthConfirmed?: string;
  shrinkageApproved?: string;
  torqueApproved?: string;
  qualityStandardReady?: string;
  linePlanned?: string;
  openConditions?: string;
  responsibleOwner?: string;
  dueDate?: string;
  approvedBy?: string;
}
