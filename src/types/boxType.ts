// BoxType (tipo de caja de empaque)

export interface BoxType {
  id: number;
  boxCode: string;
  length?: number;
  width?: number;
  height?: number;
  emptyCartonWeight?: number;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateBoxTypeInput {
  boxCode: string;
  length?: number;
  width?: number;
  height?: number;
  emptyCartonWeight?: number;
  comments?: string;
}
