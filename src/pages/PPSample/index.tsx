import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import StyleIcon from '@mui/icons-material/Style';

const fields = [
  'Sample ID', 'FGPO', 'Style', 'Color', 'Size', 'Sample Version', 'Fabric Lot',
  'Trim Version', 'Preparation Date', 'Submission Date', 'Measurement Result',
  'Construction Result', 'Fit Result', 'Fabric Result', 'Trim Result', 'Label Result',
  'Internal Review', 'Customer Review', 'Customer Comments', 'Approval Date',
  'Approved By', 'Status', 'Document Link', 'Photo Link', 'Last Updated',
];

const PPSamplePage: React.FC = () => (
  <ModulePlaceholder
    title="PP Sample"
    subtitle="Pre-Production Sample: muestra inicial para aprobación de cliente"
    icon={<StyleIcon />}
    fields={fields}
    accent="info"
    note="Aprobación de muestra antes de producción masiva. Incluye revisión de medidas, construcción y fit."
  />
);

export default PPSamplePage;
