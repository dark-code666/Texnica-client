import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const fields = [
  'Inventory ID', 'Fabric PO Number', 'FGPO', 'Fabric Component', 'Lot Number', 'UOM',
  'Received Quantity', 'Approved Quantity', 'Rejected Quantity', 'Hold Quantity',
  'Reserved Quantity', 'Issued Quantity', 'Returned Quantity', 'Available Quantity',
  'Shortage Quantity', 'Warehouse Location', 'Inventory Status', 'Data Owner',
  'Last Updated', 'Remarks',
];

const FabricInventoryPage: React.FC = () => (
  <ModulePlaceholder
    title="Fabric Inventory"
    subtitle="Inventario de tela por lote: recibido, aprobado, reservado, emitido y disponible"
    icon={<Inventory2Icon />}
    fields={fields}
    accent="info"
    note="Available Quantity y Shortage se calculan automáticamente desde recepción, aprobación y consumo."
  />
);

export default FabricInventoryPage;
