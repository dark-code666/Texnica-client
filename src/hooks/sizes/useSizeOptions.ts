import { useCallback, useEffect, useState } from 'react';
import { sizesApi } from '../../utils/api';
import { SelectOption } from '../../types';

/** Opciones de Size para selects/autocompletes */
export const useSizeOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await sizesApi.getAll();
      setOptions((res.data ?? []).map((f: any) => ({
        id: f.id ?? f.ID,
        label: f.sizeCode ?? f.SizeCode ?? '',
        sub: '',
      })));
    } catch { /* vacío */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { reload(); }, [reload]);
  return { options, loading, reload };
};
