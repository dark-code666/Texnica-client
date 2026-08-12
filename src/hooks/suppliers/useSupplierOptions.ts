import { useCallback, useEffect, useState } from 'react';
import { suppliersApi } from '../../utils/api';
import { SelectOption } from '../../types';

/** Opciones de Supplier para selects/autocompletes */
export const useSupplierOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await suppliersApi.getAll();
      setOptions((res.data ?? []).map((f: any) => ({
        id: f.id ?? f.ID,
        label: f.name ?? f.Name ?? '',
        sub: f.supplierCode ?? f.SupplierCode ?? '',
      })));
    } catch { /* vacío */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { reload(); }, [reload]);
  return { options, loading, reload };
};
