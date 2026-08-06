// Shade Match (aprobación de tonalidad entre componentes)

export interface ShadeMatch {
  id: number;
  reviewDate: string;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  bodyFabricLot?: string;
  ribLot?: string;
  shoulderTapeLot?: string;
  bodyShadeGroup?: string;
  ribShadeGroup?: string;
  tapeShadeGroup?: string;
  bodyVsRib?: string;
  bodyVsTape?: string;
  lightSource?: string;
  beforeWashResult?: string;
  afterWashResult?: string;
  overallResult?: string;
  approvedBy?: string;
  reportLink?: string;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateShadeMatchInput {
  reviewDate: string;
  fgpoId: number;
  bodyFabricLot?: string;
  ribLot?: string;
  shoulderTapeLot?: string;
  bodyShadeGroup?: string;
  ribShadeGroup?: string;
  tapeShadeGroup?: string;
  bodyVsRib?: string;
  bodyVsTape?: string;
  lightSource?: string;
  beforeWashResult?: string;
  afterWashResult?: string;
  overallResult?: string;
  approvedBy?: string;
  reportLink?: string;
  comments?: string;
}
