// Style (catálogo de estilos)

export interface Style {
  id: number;
  styleCode: string;
  description?: string;
  fabricDescription?: string;
  fabricContent?: string;
  construction?: string;
  gsm?: number;
  weightOz?: number;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateStyleInput {
  styleCode: string;
  description?: string;
  fabricDescription?: string;
  fabricContent?: string;
  construction?: string;
  gsm?: number;
  weightOz?: number;
  comments?: string;
}
