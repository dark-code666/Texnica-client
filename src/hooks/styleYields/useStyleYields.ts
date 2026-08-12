import { useResource } from '../useResource';
import { styleYieldsApi } from '../../utils/api';
import { StyleYield } from '../../types';

const mapStyleYield = (raw: any): StyleYield => ({
  id: raw.id ?? raw.ID ?? 0,
  styleId: raw.styleId ?? raw.StyleId ?? 0,
  styleCode: raw.styleCode ?? raw.StyleCode ?? '',
  componentId: raw.componentId ?? raw.ComponentId ?? 0,
  componentCode: raw.componentCode ?? raw.ComponentCode ?? '',
  yieldQuoted: raw.yieldQuoted ?? raw.YieldQuoted ?? undefined,
  yieldReal: raw.yieldReal ?? raw.YieldReal ?? undefined,
  notes: raw.notes ?? raw.Notes ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useStyleYields = () => useResource<StyleYield>(styleYieldsApi, mapStyleYield);
