import { useCallback, useEffect, useState } from 'react';
import { fgpoApi } from '../../utils/api';
import { SelectOption } from '../../types';

/** Hook de opciones de FGPO para selects/autocompletes (usa getAll) */
export const useFgpoOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fgpoApi.getAll();
      setOptions((res.data ?? []).map((f: any) => ({
        id: f.id ?? f.ID,
        label: f.fgpoNumber ?? f.FGPONumber ?? '',
        sub: f.customerName ?? f.CustomerName ?? '',
        meta: {
          sizeId: f.sizeId ?? f.SizeId ?? undefined,
          sizeCode: f.sizeCode ?? f.SizeCode ?? '',
          style: f.style ?? f.Style ?? '',
          color: f.color ?? f.Color ?? '',
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
