import { useCallback, useEffect, useState } from 'react';
import { fabricPOsApi } from '../../utils/api';
import { SelectOption } from '../../types';

/** Hook de opciones de Fabric PO para selects/autocompletes (usa getAll) */
export const useFabricPOOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fabricPOsApi.getAll();
      setOptions((res.data ?? []).map((p: any) => ({
        id: p.id ?? p.ID,
        label: p.fabricPONumber ?? p.FabricPONumber ?? '',
        sub: p.supplier ?? p.Supplier ?? '',
        meta: {
          fabricComponent: p.fabricComponent ?? p.FabricComponent ?? '',
          uom: p.uom ?? p.UOM ?? '',
          fgpos: (p.fgpos ?? p.Fgpos ?? []).map((f: any) => ({
            fgpoId: f.fgpoId ?? f.FGPOId ?? 0,
            fgpoNumber: f.fgpoNumber ?? f.FGPONumber ?? '',
            style: f.style ?? f.Style ?? '',
            color: f.color ?? f.Color ?? '',
          })),
        },
      })));
    } catch {
      /* mantiene opciones vacías */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { options, loading, reload };
};
