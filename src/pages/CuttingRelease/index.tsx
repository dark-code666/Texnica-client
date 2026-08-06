import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const fields = [
  'Release Number', 'Release Date', 'FGPO', 'Style', 'Color', 'Fabric Lot',
  'Approved Cut Qty', 'Approved Width', 'Marker Number', 'Approved Yield',
  'PRR Result', 'Released By', 'Reviewed By', 'Exception', 'Conditions',
  'Release Status', 'Last Updated', 'Comments',
];

const CuttingReleasePage: React.FC = () => (
  <ModulePlaceholder
    title="Cutting Release"
    subtitle="Liberación del tendido y corte (aprobación de marcador, rendimiento y cantidad)"
    icon={<ContentCutIcon />}
    fields={fields}
    accent="success"
    note="Depende de PRR (Production Readiness) aprobado. Libera el corte para la línea."
  />
);

export default CuttingReleasePage;
