// Mill Test

export interface MillTest {
  id: number;
  fabricPOId: number;
  fabricPONumber: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  supplier?: string;
  lotNumber?: string;
  lotId?: number | null;
  color?: string;
  rollQty: number;
  actualWidth: number;
  actualGSM: number;
  lengthShrinkagePercentage: number;
  widthShrinkagePercentage: number;
  torquePercentage: number;
  bowingPercentage: number;
  skewingPercentage: number;
  colorfastness?: string;
  washAppearance?: string;
  handFeel?: string;
  testDate: string;
  testedBy?: string;
  testResult?: string;
  approvedForExport: boolean;
  reportLink?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateMillTestInput {
  fabricPOId: number;
  fgpoId: number;
  supplier?: string;
  lotNumber?: string;
  color?: string;
  rollQty: number;
  actualWidth: number;
  actualGSM: number;
  lengthShrinkagePercentage: number;
  widthShrinkagePercentage: number;
  torquePercentage: number;
  bowingPercentage: number;
  skewingPercentage: number;
  colorfastness?: string;
  washAppearance?: string;
  handFeel?: string;
  testDate: string;
  testedBy?: string;
  testResult?: string;
  approvedForExport: boolean;
  reportLink?: string;
  comments?: string;
}
