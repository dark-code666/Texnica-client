import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const fields = [
  'Inspection ID', 'Inspection Date', 'FGPO', 'Style', 'Color', 'Lot / Shipment',
  'Lot Size', 'Inspection Level', 'AQL Major', 'AQL Minor', 'Sample Size',
  'Critical Defects', 'Major Defects', 'Minor Defects', 'Critical Ac', 'Major Ac',
  'Minor Ac', 'Critical Re', 'Major Re', 'Minor Re', 'Result', 'Inspector',
  'Disposition', 'Report Link', 'Last Updated', 'Comments',
];

const FinalInspectionPage: React.FC = () => (
  <ModulePlaceholder
    title="Final Inspection"
    subtitle="Inspección final AQL antes del embarque (disposición: aprobar / retener / rechazar)"
    icon={<WorkspacePremiumIcon />}
    fields={fields}
    accent="success"
    note="Resultado final que libera la mercancía para embarque según muestreo AQL."
  />
);

export default FinalInspectionPage;
