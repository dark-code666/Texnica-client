import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const fields = [
  'Inspection ID', 'Inspection Date', 'FGPO', 'Style', 'Color', 'Lot / Shipment',
  'Lot Size', 'Inspection Level', 'AQL Major', 'AQL Minor', 'Sample Size',
  'Critical Defects', 'Major Defects', 'Minor Defects', 'Critical Ac', 'Major Ac',
  'Minor Ac', 'Critical Re', 'Major Re', 'Minor Re', 'Result', 'Inspector',
  'Disposition', 'Report Link', 'Last Updated', 'Comments',
];

const EndlineInspectionPage: React.FC = () => (
  <ModulePlaceholder
    title="Endline Inspection"
    subtitle="Inspección de fin de línea con muestreo AQL (acceptance quality limit)"
    icon={<VerifiedUserIcon />}
    fields={fields}
    accent="warning"
    note="Usa tablas AQL: Sample Size, números Ac (aceptación) y Re (rechazo) por nivel de criticidad."
  />
);

export default EndlineInspectionPage;
