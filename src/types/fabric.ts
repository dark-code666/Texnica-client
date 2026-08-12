// Fabric (tela — referencia, contenido y construcción)

export interface Fabric {
  id: number;
  fabricReference?: string;
  fabricName: string;
  color?: string;
  content?: string;
  construction?: string;
  gsm?: number;
  weightOz?: number;
  comments?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFabricInput {
  fabricReference?: string;
  fabricName: string;
  color?: string;
  content?: string;
  construction?: string;
  gsm?: number;
  weightOz?: number;
  comments?: string;
}
