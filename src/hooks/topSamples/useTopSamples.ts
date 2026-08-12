import { useResource } from '../useResource';
import { topSamplesApi } from '../../utils/api';
import { TopSample } from '../../types';

const mapTopSample = (raw: any): TopSample => ({
  id: raw.id ?? raw.ID ?? 0,
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  style: raw.style ?? raw.Style ?? '',
  color: raw.color ?? raw.Color ?? '',
  size: raw.size ?? raw.Size ?? '',
  productionLine: raw.productionLine ?? raw.ProductionLine ?? '',
  fabricLot: raw.fabricLot ?? raw.FabricLot ?? '',
  cutLotBundle: raw.cutLotBundle ?? raw.CutLotBundle ?? '',
  trimVersion: raw.trimVersion ?? raw.TrimVersion ?? '',
  threadLot: raw.threadLot ?? raw.ThreadLot ?? '',
  topQty: raw.topQty ?? raw.TopQty ?? 0,
  productionDate: raw.productionDate ?? raw.ProductionDate ?? '',
  measurementResult: raw.measurementResult ?? raw.MeasurementResult ?? '',
  constructionResult: raw.constructionResult ?? raw.ConstructionResult ?? '',
  workmanshipResult: raw.workmanshipResult ?? raw.WorkmanshipResult ?? '',
  labelResult: raw.labelResult ?? raw.LabelResult ?? '',
  packingResult: raw.packingResult ?? raw.PackingResult ?? '',
  internalReview: raw.internalReview ?? raw.InternalReview ?? '',
  customerReview: raw.customerReview ?? raw.CustomerReview ?? '',
  correctiveAction: raw.correctiveAction ?? raw.CorrectiveAction ?? '',
  approvalDate: raw.approvalDate ?? raw.ApprovalDate ?? '',
  approvedBy: raw.approvedBy ?? raw.ApprovedBy ?? '',
  status: raw.status ?? raw.Status ?? '',
  documentLink: raw.documentLink ?? raw.DocumentLink ?? '',
  photoLink: raw.photoLink ?? raw.PhotoLink ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de TOP Sample: consume /api/top-samples */
export const useTopSamples = () =>
  useResource<TopSample>(topSamplesApi, mapTopSample);
