import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const fields = [
  'PRR ID', 'Review Date', 'FGPO', 'Style', 'Color', 'PO Confirmed',
  'Tech Pack Current', 'Fabric Approved', 'Trims Approved', 'Trims Available',
  'PP Sample Approved', 'Pattern Approved', 'Marker Approved', 'Fabric Width Confirmed',
  'Shrinkage Approved', 'Torque Approved', 'Quality Standard Ready', 'Line Planned',
  'Overall Result', 'Open Conditions', 'Responsible Owner', 'Due Date',
  'Approved By', 'Last Updated',
];

const ProductionReadinessPage: React.FC = () => (
  <ModulePlaceholder
    title="Production Readiness"
    subtitle="PRR — Checklist de preparación antes de iniciar producción"
    icon={<PlaylistAddCheckIcon />}
    fields={fields}
    accent="success"
    note="Cada condición aprobada/lista alimenta el Overall Result que libera la producción."
  />
);

export default ProductionReadinessPage;
