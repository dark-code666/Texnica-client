import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const fields = [
  'Reservation ID', 'Reservation Date', 'Fabric PO Number', 'FGPO', 'Fabric Component',
  'Lot Number', 'Reserved Quantity', 'UOM', 'Released Quantity', 'Remaining Reservation',
  'Status', 'Reserved By', 'Approved By', 'Last Updated', 'Comments',
];

const FabricReservationPage: React.FC = () => (
  <ModulePlaceholder
    title="Fabric Reservation"
    subtitle="Reserva de tela para órdenes de producción (cantidad reservada vs liberada)"
    icon={<BookmarkAddIcon />}
    fields={fields}
    accent="info"
    note="Remaining Reservation = Reserved − Released. Se vincula al inventario de tela."
  />
);

export default FabricReservationPage;
