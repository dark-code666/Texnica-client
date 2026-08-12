import { useResource } from '../useResource';
import { sizesApi } from '../../utils/api';
import { Size } from '../../types';

const mapSize = (raw: any): Size => ({
  id: raw.id ?? raw.ID ?? 0,
  sizeCode: raw.sizeCode ?? raw.SizeCode ?? '',
  sortOrder: raw.sortOrder ?? raw.SortOrder ?? 0,
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useSizes = () => useResource<Size>(sizesApi, mapSize);
