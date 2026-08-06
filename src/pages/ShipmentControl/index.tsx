import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const fields = [
  'Shipment Number', 'Customer', 'FGPO', 'Style', 'Color', 'Size', 'Planned Qty',
  'Actual Loaded Qty', 'In Transit Qty', 'Customer Received Qty', 'Total Shipped Qty',
  'Shipment Variance', 'Pending to Ship', 'Over-shipment Qty', 'Container Type',
  'Container Number', 'Booking Number', 'Planned Loading Date', 'Actual Loading Date',
  'ETD', 'ETA', 'Destination', 'Shipment Status', 'Packing List', 'Invoice Number',
  'Load Plan', 'Data Owner', 'Last Updated', 'Remarks',
];

const ShipmentControlPage: React.FC = () => (
  <ModulePlaceholder
    title="Shipment Control"
    subtitle="Control de embarques: planeado vs cargado, contenedores, ETD/ETA y destino"
    icon={<FlightTakeoffIcon />}
    fields={fields}
    accent="info"
    note="Shipment Variance, Pending to Ship y Over-shipment se calculan automáticamente."
  />
);

export default ShipmentControlPage;
