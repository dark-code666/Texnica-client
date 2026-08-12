// StyleYield (consumo por estilo y componente)

export interface StyleYield {
  id: number;
  styleId: number;
  styleCode: string;
  componentId: number;
  componentCode: string;
  yieldQuoted?: number;
  yieldReal?: number;
  notes?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateStyleYieldInput {
  styleId: number;
  componentId: number;
  yieldQuoted?: number;
  yieldReal?: number;
  notes?: string;
}
