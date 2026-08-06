// Inline Quality (control de calidad en línea de costura)

export interface InlineQuality {
  id: number;
  inspectionDate: string;
  time?: string;
  line?: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  operation?: string;
  operator?: string;
  checkedQty: number;
  criticalDefects: number;
  majorDefects: number;
  minorDefects: number;
  totalDefects: number;
  dhuPct: number;
  defectivePieces: number;
  defectiveRatePct: number;
  maxAllowed: number;
  result?: string;
  inspector?: string;
  immediateCorrection?: string;
  rootCause?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateInlineQualityInput {
  inspectionDate: string;
  time?: string;
  line?: string;
  fgpoId: number;
  operation?: string;
  operator?: string;
  checkedQty: number;
  criticalDefects: number;
  majorDefects: number;
  minorDefects: number;
  defectivePieces: number;
  maxAllowed: number;
  inspector?: string;
  immediateCorrection?: string;
  rootCause?: string;
}
