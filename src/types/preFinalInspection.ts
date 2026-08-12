// Pre-Final Inspection (inspección previa al empaque con muestreo AQL)

export interface PreFinalInspection {
  id: number;
  inspectionDate: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
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
  inspector?: string;
  disposition?: string;
  reportLink?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePreFinalInspectionInput {
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
  inspector?: string;
  disposition?: string;
  reportLink?: string;
  comments?: string;
}
