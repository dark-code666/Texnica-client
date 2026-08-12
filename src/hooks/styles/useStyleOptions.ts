import { useCallback, useEffect, useState } from 'react';
import { stylesApi } from '../../utils/api';
import { SelectOption } from '../../types';

/** Opciones de Style para selects/autocompletes */
export const useStyleOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await stylesApi.getAll();
      setOptions((res.data ?? []).map((f: any) => ({
        id: f.id ?? f.ID,
        label: f.styleCode ?? f.StyleCode ?? '',
        sub: f.description ?? f.Description ?? '',
      })));
    } catch { /* vacío */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { reload(); }, [reload]);
  return { options, loading, reload };
};
