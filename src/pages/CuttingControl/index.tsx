import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const fields = [
  'Cut Record ID', 'Date', 'FGPO', 'Style', 'Color', 'Size', 'Fabric Lot',
  'Marker Number', 'Planned Cut', 'Actual Cut', 'Good Cut', 'Damaged Qty',
  'Replacement Cut', 'Sent to Sewing', 'Cutting Variance', 'Pending Cut',
  'Overcut Qty', 'Cut-to-Sew Difference', 'Release Status', 'Responsible Person',
  'Last Updated', 'Comments',
];

const CuttingControlPage: React.FC = () => (
  <ModulePlaceholder
    title="Cutting Control"
    subtitle="Control del corte: planeado vs real, dañados, reposición y envío a costura"
    icon={<ContentCutIcon />}
    fields={fields}
    accent="success"
    note="Columnas calculadas: Cutting Variance, Pending Cut, Overcut Qty y Cut-to-Sew Difference."
  />
);

export default CuttingControlPage;
