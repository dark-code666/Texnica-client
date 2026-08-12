import { useResource } from '../useResource';
import { fgpoLinesApi } from '../../utils/api';
import { FgpoLine } from '../../types';

const mapFgpoLine = (raw: any): FgpoLine => ({
  id: raw.id ?? raw.ID ?? 0,
  fgpoId: raw.fgpoId ?? raw.FgpoId ?? 0,
  fgpoNumber: raw.fgpoNumber ?? raw.FgpoNumber ?? '',
  customerName: raw.customerName ?? raw.CustomerName ?? '',
  styleId: raw.styleId ?? raw.StyleId ?? 0,
  styleCode: raw.styleCode ?? raw.StyleCode ?? '',
  colorId: raw.colorId ?? raw.ColorId ?? 0,
  colorName: raw.colorName ?? raw.ColorName ?? '',
  sizeId: raw.sizeId ?? raw.SizeId ?? 0,
  sizeCode: raw.sizeCode ?? raw.SizeCode ?? '',
  quantity: raw.quantity ?? raw.Quantity ?? 0,
  unitPrice: raw.unitPrice ?? raw.UnitPrice ?? undefined,
  totalValue: raw.totalValue ?? raw.TotalValue ?? 0,
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useFgpoLines = () => useResource<FgpoLine>(fgpoLinesApi, mapFgpoLine);
