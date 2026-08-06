import { useCallback, useEffect, useState } from 'react';
import { fabricReceivingsApi } from '../../utils/api';

export interface FabricReceivingOption {
  id: number;
  label: string;
  sub?: string;
  supplier?: string;
  fabricPOId?: number;
  fabricPONumber?: string;
  fgpoId?: number;
  fgpoNumber?: string;
  customerName?: string;
  receivingDate?: string;
  warehouseLocation?: string;
  receivedBy?: string;
  dataOwner?: string;
}

/** Hook de opciones de Fabric Receiving para selects/autocompletes (usa getAll) */
export const useFabricReceivingOptions = () => {
  const [options, setOptions] = useState<FabricReceivingOption[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fabricReceivingsApi.getAll();
      setOptions((res.data ?? []).map((r: any) => ({
        id: r.id ?? r.ID,
        label: r.receivingNumber ?? r.ReceivingNumber ?? '',
        sub: r.supplier ?? r.Supplier ?? '',
        supplier: r.supplier ?? r.Supplier ?? '',
        fabricPOId: r.fabricPOId ?? r.FabricPOId,
        fabricPONumber: r.fabricPONumber ?? r.FabricPONumber ?? '',
        fgpoId: r.fgpoId ?? r.FGPOId,
        fgpoNumber: r.fgpoNumber ?? r.FGPONumber ?? '',
        customerName: r.customerName ?? r.CustomerName ?? '',
        receivingDate: r.receivingDate ?? r.ReceivingDate ?? '',
        warehouseLocation: r.warehouseLocation ?? r.WarehouseLocation ?? '',
        receivedBy: r.receivedBy ?? r.ReceivedBy ?? '',
        dataOwner: r.dataOwner ?? r.DataOwner ?? '',
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
