import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import CribIcon from '@mui/icons-material/Crib';

const fields = [
  'Inspection ID', 'Date', 'FGPO', 'Style', 'Color', 'Size', 'Fabric Lot',
  'Cut Lot / Lay', 'Bundle No.', 'Sample Qty', 'Panel Defects', 'Notches Defects',
  'Drill Mark Defects', 'Shade Defects', 'Measurement Defects', 'Total Defects',
  'Defect Rate %', 'Max Allowed', 'Result', 'Inspector', 'Corrective Action',
  'Last Updated', 'Comments',
];

const CuttingPanelQCPage: React.FC = () => (
  <ModulePlaceholder
    title="Cutting Panel QC"
    subtitle="Inspección de calidad de paneles cortados (defectos por paquete o tendido)"
    icon={<CribIcon />}
    fields={fields}
    accent="success"
    note="Valida paneles antes de que pasen a costura. Result = Defect Rate % vs Max Allowed."
  />
);

export default CuttingPanelQCPage;
