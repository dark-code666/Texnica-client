import { useCallback, useEffect, useState } from 'react';
import { componentsApi } from '../../utils/api';
import { SelectOption } from '../../types';

/** Opciones de Component para selects/autocompletes */
export const useComponentOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await componentsApi.getAll();
      setOptions((res.data ?? []).map((f: any) => ({
        id: f.id ?? f.ID,
        label: f.componentCode ?? f.ComponentCode ?? '',
        sub: f.description ?? f.Description ?? '',
      })));
    } catch { /* vacío */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { reload(); }, [reload]);
  return { options, loading, reload };
};
