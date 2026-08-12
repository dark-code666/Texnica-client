import { useResource } from '../useResource';
import { fabricsApi } from '../../utils/api';
import { Fabric } from '../../types';

const mapFabric = (raw: any): Fabric => ({
  id: raw.id ?? raw.ID ?? 0,
  fabricReference: raw.fabricReference ?? raw.FabricReference ?? '',
  fabricName: raw.fabricName ?? raw.FabricName ?? '',
  color: raw.color ?? raw.Color ?? '',
  content: raw.content ?? raw.Content ?? '',
  construction: raw.construction ?? raw.Construction ?? '',
  gsm: raw.gsm ?? raw.Gsm ?? undefined,
  weightOz: raw.weightOz ?? raw.WeightOz ?? undefined,
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useFabrics = () => useResource<Fabric>(fabricsApi, mapFabric);
