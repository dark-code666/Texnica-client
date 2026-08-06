// Internal Test (pruebas internas de laboratorio)

export interface InternalTest {
  id: number;
  testDate: string;
  fabricPOId: number;
  fabricPONumber: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  supplier?: string;
  lotNumber?: string;
  lotId?: number;
  color?: string;
  actualWidth: number;
  specimenAreaCm2: number;
  weightBeforeG: number;
  weightAfterG: number;
  targetGSM: number;
  gsmBefore: number;
  gsmAfter: number;
  gsmVariancePct: number;
  lengthBefore: number;
  lengthAfter: number;
  lengthShrinkagePct: number;
  widthBefore: number;
  widthAfter: number;
  widthShrinkagePct: number;
  torquePct: number;
  bowingPct: number;
  skewingPct: number;
  shadeResult?: string;
  washAppearance?: string;
  handFeel?: string;
  testResult?: string;
  testedBy?: string;
  approvedBy?: string;
  reportLink?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateInternalTestInput {
  testDate: string;
  fabricPOId: number;
  fgpoId: number;
  supplier?: string;
  lotNumber?: string;
  color?: string;
  actualWidth: number;
  specimenAreaCm2: number;
  weightBeforeG: number;
  weightAfterG: number;
  targetGSM: number;
  lengthBefore: number;
  lengthAfter: number;
  widthBefore: number;
  widthAfter: number;
  torquePct: number;
  bowingPct: number;
  skewingPct: number;
  shadeResult?: string;
  washAppearance?: string;
  handFeel?: string;
  testResult?: string;
  testedBy?: string;
  approvedBy?: string;
  reportLink?: string;
  comments?: string;
}
