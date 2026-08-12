import { useResource } from '../useResource';
import { ppSamplesApi } from '../../utils/api';
import { PpSample } from '../../types';

const mapPpSample = (raw: any): PpSample => ({
  id: raw.id ?? raw.ID ?? 0,
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  size: raw.size ?? raw.Size ?? '',
  sampleVersion: raw.sampleVersion ?? raw.SampleVersion ?? '',
  fabricLot: raw.fabricLot ?? raw.FabricLot ?? '',
  trimVersion: raw.trimVersion ?? raw.TrimVersion ?? '',
  preparationDate: raw.preparationDate ?? raw.PreparationDate ?? '',
  submissionDate: raw.submissionDate ?? raw.SubmissionDate ?? '',
  measurementResult: raw.measurementResult ?? raw.MeasurementResult ?? '',
  constructionResult: raw.constructionResult ?? raw.ConstructionResult ?? '',
  fitResult: raw.fitResult ?? raw.FitResult ?? '',
  fabricResult: raw.fabricResult ?? raw.FabricResult ?? '',
  trimResult: raw.trimResult ?? raw.TrimResult ?? '',
  labelResult: raw.labelResult ?? raw.LabelResult ?? '',
  internalReview: raw.internalReview ?? raw.InternalReview ?? '',
  customerReview: raw.customerReview ?? raw.CustomerReview ?? '',
  customerComments: raw.customerComments ?? raw.CustomerComments ?? '',
  approvalDate: raw.approvalDate ?? raw.ApprovalDate ?? '',
  approvedBy: raw.approvedBy ?? raw.ApprovedBy ?? '',
  status: raw.status ?? raw.Status ?? '',
  documentLink: raw.documentLink ?? raw.DocumentLink ?? '',
  photoLink: raw.photoLink ?? raw.PhotoLink ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de PP Sample: consume /api/pp-samples */
export const usePpSamples = () =>
  useResource<PpSample>(ppSamplesApi, mapPpSample);
