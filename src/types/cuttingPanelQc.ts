// Cutting Panel QC (calidad de paquetes de corte)

export interface CuttingPanelQc {
  id: number;
  inspectionDate: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  sizeId?: number;
  sizeName?: string;
  fabricLot?: string;
  cutLotLay?: string;
  bundleNo?: string;
  sampleQty: number;
  panelDefects: number;
  notchesDefects: number;
  drillMarkDefects: number;
  shadeDefects: number;
  measurementDefects: number;
  totalDefects: number;
  defectRatePct: number;
  maxAllowed: number;
  result?: string;
  inspectorId?: number;
  inspectorName?: string;
  correctiveAction?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCuttingPanelQcInput {
  inspectionDate: string;
  fgpoId: number;
  sizeId?: number;
  fabricLot?: string;
  cutLotLay?: string;
  bundleNo?: string;
  sampleQty: number;
  panelDefects: number;
  notchesDefects: number;
  drillMarkDefects: number;
  shadeDefects: number;
  measurementDefects: number;
  inspectorId?: number;
  correctiveAction?: string;
  comments?: string;
}
