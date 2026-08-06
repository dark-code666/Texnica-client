import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import GavelIcon from '@mui/icons-material/Gavel';

const fields = [
  'Inspection ID', 'Inspection Date', 'FGPO', 'Style', 'Color', 'Lot / Shipment',
  'Lot Size', 'Inspection Level', 'AQL Major', 'AQL Minor', 'Sample Size',
  'Critical Defects', 'Major Defects', 'Minor Defects', 'Critical Ac', 'Major Ac',
  'Minor Ac', 'Critical Re', 'Major Re', 'Minor Re', 'Result', 'Inspector',
  'Disposition', 'Report Link', 'Last Updated', 'Comments',
];

const PreFinalInspectionPage: React.FC = () => (
  <ModulePlaceholder
    title="Pre-Final Inspection"
    subtitle="Inspección previa al empaque con muestreo AQL"
    icon={<GavelIcon />}
    fields={fields}
    accent="warning"
    note="Misma estructura AQL que Endline/Final. Se ejecuta antes del empaque final."
  />
);

export default PreFinalInspectionPage;
