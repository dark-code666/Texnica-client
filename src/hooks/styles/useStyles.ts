import { useResource } from '../useResource';
import { stylesApi } from '../../utils/api';
import { Style } from '../../types';

const mapStyle = (raw: any): Style => ({
  id: raw.id ?? raw.ID ?? 0,
  styleCode: raw.styleCode ?? raw.StyleCode ?? '',
  description: raw.description ?? raw.Description ?? '',
  fabricDescription: raw.fabricDescription ?? raw.FabricDescription ?? '',
  fabricContent: raw.fabricContent ?? raw.FabricContent ?? '',
  construction: raw.construction ?? raw.Construction ?? '',
  gsm: raw.gsm ?? raw.Gsm ?? undefined,
  weightOz: raw.weightOz ?? raw.WeightOz ?? undefined,
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useStyles = () => useResource<Style>(stylesApi, mapStyle);
