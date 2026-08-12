// AQL Inspection (Endline / Pre-Final / Final unificados)

export interface AqlInspection {
  id: number;
  inspectionType: string;
  inspectionDate: string;
  fgpoId: number;
  fgpoNumber: string;
  lotShipment?: string;
  lotSize: number;
  inspectionLevel?: string;
  aqlMajor: number;
  aqlMinor: number;
  sampleSize: number;
  criticalDefects: number;
  majorDefects: number;
  minorDefects: number;
  criticalAc: number;
  majorAc: number;
  minorAc: number;
  criticalRe: number;
  majorRe: number;
  minorRe: number;
  result?: string;
  inspectorId?: number;
  inspectorName?: string;
  disposition?: string;
  reportLink?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateAqlInspectionInput {
  inspectionType: string;
  inspectionDate: string;
  fgpoId: number;
  lotShipment?: string;
  lotSize: number;
  inspectionLevel?: string;
  aqlMajor: number;
  aqlMinor: number;
  sampleSize: number;
  criticalDefects: number;
  majorDefects: number;
  minorDefects: number;
  criticalAc: number;
  majorAc: number;
  minorAc: number;
  criticalRe: number;
  majorRe: number;
  minorRe: number;
  inspectorId?: number | null;
  disposition?: string;
  reportLink?: string;
  comments?: string;
}
