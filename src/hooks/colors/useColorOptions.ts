import { useCallback, useEffect, useState } from 'react';
import { colorsApi } from '../../utils/api';
import { SelectOption } from '../../types';

/** Opciones de Color para selects/autocompletes */
export const useColorOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await colorsApi.getAll();
      setOptions((res.data ?? []).map((f: any) => ({
        id: f.id ?? f.ID,
        label: f.colorName ?? f.ColorName ?? '',
        sub: f.dyeMethod ?? f.DyeMethod ?? '',
      })));
    } catch { /* vacío */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { reload(); }, [reload]);
  return { options, loading, reload };
};
