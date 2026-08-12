import { useResource } from '../useResource';
import { pricesApi } from '../../utils/api';
import { Price } from '../../types';

const mapPrice = (raw: any): Price => ({
  id: raw.id ?? raw.ID ?? 0,
  styleId: raw.styleId ?? raw.StyleId ?? 0,
  styleCode: raw.styleCode ?? raw.StyleCode ?? '',
  colorId: raw.colorId ?? raw.ColorId ?? 0,
  colorName: raw.colorName ?? raw.ColorName ?? '',
  sizeId: raw.sizeId ?? raw.SizeId ?? 0,
  sizeCode: raw.sizeCode ?? raw.SizeCode ?? '',
  sku: raw.sku ?? raw.Sku ?? '',
  unitPrice: raw.unitPrice ?? raw.UnitPrice ?? 0,
  comments: raw.comments ?? raw.Comments ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const usePrices = () => useResource<Price>(pricesApi, mapPrice);
