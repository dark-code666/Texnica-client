// Factory (Fábrica)

export interface Factory {
  id: number;
  name: string;
  location?: string;
  contact?: string;
  phone?: string;
  email?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFactoryInput {
  name: string;
  location?: string;
  contact?: string;
  phone?: string;
  email?: string;
}
