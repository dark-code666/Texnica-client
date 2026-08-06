import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import ChecklistIcon from '@mui/icons-material/Checklist';

const fields = [
  'TOP ID', 'FGPO', 'Style', 'Color', 'Size', 'Production Line', 'Fabric Lot',
  'Cut Lot / Bundle', 'Trim Version', 'Thread Lot', 'TOP Qty', 'Production Date',
  'Measurement Result', 'Construction Result', 'Workmanship Result', 'Label Result',
  'Packing Result', 'Internal Review', 'Customer Review', 'Corrective Action',
  'Approval Date', 'Approved By', 'Status', 'Document Link', 'Photo Link', 'Last Updated',
];

const TOPSamplePage: React.FC = () => (
  <ModulePlaceholder
    title="TOP Sample"
    subtitle="TOP (Top of Production) Sample: muestra de la línea de producción"
    icon={<ChecklistIcon />}
    fields={fields}
    accent="info"
    note="Validación de la primera producción en línea antes de aprobar corrida completa."
  />
);

export default TOPSamplePage;
