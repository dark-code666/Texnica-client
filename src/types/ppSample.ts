// PP Sample (Pre-Production Sample — muestra para aprobación de cliente)

export interface PpSample {
  id: number;
  fgpoId: number;
  fgpoNumber: string;
  customerName: string;
  style?: string;
  color?: string;
  size?: string;
  sampleVersion?: string;
  fabricLot?: string;
  trimVersion?: string;
  preparationDate?: string;
  submissionDate?: string;
  measurementResult?: string;
  constructionResult?: string;
  fitResult?: string;
  fabricResult?: string;
  trimResult?: string;
  labelResult?: string;
  internalReview?: string;
  customerReview?: string;
  customerComments?: string;
  approvalDate?: string;
  approvedBy?: string;
  status?: string;
  documentLink?: string;
  photoLink?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePpSampleInput {
  fgpoId: number;
  size?: string;
  sampleVersion?: string;
  fabricLot?: string;
  trimVersion?: string;
  preparationDate?: string;
  submissionDate?: string;
  measurementResult?: string;
  constructionResult?: string;
  fitResult?: string;
  fabricResult?: string;
  trimResult?: string;
  labelResult?: string;
  internalReview?: string;
  customerReview?: string;
  customerComments?: string;
  approvalDate?: string;
  approvedBy?: string;
  status?: string;
  documentLink?: string;
  photoLink?: string;
}
