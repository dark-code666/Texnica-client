// Component (componente de la prenda: BODY, TAPE, RIB 1X1...)

export interface Component {
  id: number;
  componentCode: string;
  description?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateComponentInput {
  componentCode: string;
  description?: string;
}
