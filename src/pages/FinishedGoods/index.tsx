import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import WarehouseIcon from '@mui/icons-material/Warehouse';

const fields = [
  'FG Record ID', 'Receipt Date', 'FGPO', 'Style', 'Color', 'Size', 'Packed Qty',
  'Warehouse Received', 'Reserved for Shipment', 'Ready to Ship', 'Loaded Qty',
  'Shipped Qty', 'Warehouse Balance', 'Warehouse Location', 'Status', 'Data Owner',
  'Last Updated', 'Remarks',
];

const FinishedGoodsPage: React.FC = () => (
  <ModulePlaceholder
    title="Finished Goods"
    subtitle="Mercancía terminada en almacén: recibida, reservada, lista y embarcada"
    icon={<WarehouseIcon />}
    fields={fields}
    accent="info"
    note="Warehouse Balance = recibido − cargado/embarcado. Se vincula a Packing y Shipment Control."
  />
);

export default FinishedGoodsPage;
