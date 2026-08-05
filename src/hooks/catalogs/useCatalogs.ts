import { useEffect, useState } from 'react';
import { catalogsApi } from '../../utils/api';
import { CatalogsMap } from '../../types';

/**
 * Hook para cargar los catálogos maestros desde GET /api/catalogs.
 * Devuelve un diccionario { Type: [values...] } y un flag de carga.
 */
export const useCatalogs = () => {
  const [catalogs, setCatalogs] = useState<CatalogsMap>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    catalogsApi
      .getAll()
      .then((res) => {
        if (mounted) setCatalogs(res.data ?? {});
      })
      .catch(() => {
        /* mantiene catálogos vacíos, se usan los fallbacks */
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { catalogs, loading };
};
