import { useResource } from '../useResource';
import { fourPointApi } from '../../utils/api';
import { FourPoint } from '../../types';

const mapFourPoint = (raw: any): FourPoint => ({
  id: raw.id ?? raw.ID ?? 0,
  inspectionDate: raw.inspectionDate ?? raw.InspectionDate ?? '',
  receivingId: raw.receivingId ?? raw.ReceivingId,
  receivingNumber: raw.receivingNumber ?? raw.ReceivingNumber ?? '',
  fabricPOId: raw.fabricPOId ?? raw.FabricPOId ?? 0,
  fabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  fgpoId: raw.fgpoId ?? raw.FGPOId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  supplier: raw.supplier ?? raw.Supplier ?? '',
  lotNumber: raw.lotNumber ?? raw.LotNumber ?? '',
  lotId: raw.lotId ?? raw.LotId,
  rollNumber: raw.rollNumber ?? raw.RollNumber ?? '',
  width: raw.width ?? raw.Width ?? 0,
  inspectedLength: raw.inspectedLength ?? raw.InspectedLength ?? 0,
  points1: raw.points1 ?? raw.Points1 ?? 0,
  points2: raw.points2 ?? raw.Points2 ?? 0,
  points3: raw.points3 ?? raw.Points3 ?? 0,
  points4: raw.points4 ?? raw.Points4 ?? 0,
  totalPoints: raw.totalPoints ?? raw.TotalPoints ?? 0,
  pointsPer100SqYd: raw.pointsPer100SqYd ?? raw.PointsPer100SqYd ?? 0,
  maxAllowed: raw.maxAllowed ?? raw.MaxAllowed ?? 0,
  acceptedQty: raw.acceptedQty ?? raw.AcceptedQty ?? 0,
  rejectedQty: raw.rejectedQty ?? raw.RejectedQty ?? 0,
  holdQty: raw.holdQty ?? raw.HoldQty ?? 0,
  result: raw.result ?? raw.Result ?? '',
  inspector: raw.inspector ?? raw.Inspector ?? '',
  reportLink: raw.reportLink ?? raw.ReportLink ?? '',
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

/** Hook de Four-Point: consume /api/four-point */
export const useFourPoints = () =>
  useResource<FourPoint>(fourPointApi, mapFourPoint);
