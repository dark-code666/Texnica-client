import { useResource } from '../useResource';
import { colorsApi } from '../../utils/api';
import { Color } from '../../types';

const mapColor = (raw: any): Color => ({
  id: raw.id ?? raw.ID ?? 0,
  colorName: raw.colorName ?? raw.ColorName ?? '',
  dyeMethod: raw.dyeMethod ?? raw.DyeMethod ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useColors = () => useResource<Color>(colorsApi, mapColor);
