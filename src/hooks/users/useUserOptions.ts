import { useCallback, useEffect, useState } from 'react';
import { usersApi } from '../../utils/api';
import { SelectOption } from '../../types';

/** Opciones de Usuarios (Supervisor) para selects/autocompletes */
export const useUserOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await usersApi.getAll();
      setOptions((res.data ?? []).map((u: any) => ({
        id: u.id ?? u.ID,
        label: u.userName ?? u.UserName ?? '',
        sub: u.userEmail ?? u.UserEmail ?? '',
      })));
    } catch { /* vacío */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { reload(); }, [reload]);
  return { options, loading, reload };
};
