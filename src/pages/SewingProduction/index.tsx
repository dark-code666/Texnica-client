import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import SewingIcon from '@mui/icons-material/ChairAlt';

const fields = [
  'Record ID', 'Date', 'Shift', 'Line', 'FGPO', 'Style', 'Color', 'Size',
  'Sewing Input', 'Daily Target', 'Daily Output', 'Cumulative Output', 'WIP',
  'Rework', 'Reject', 'Downtime Minutes', 'Target Achievement %', 'Sewing Variance',
  'Pending Sewing', 'Overproduction', 'TOP Status', 'Supervisor', 'Last Updated',
  'Problems / Remarks',
];

const SewingProductionPage: React.FC = () => (
  <ModulePlaceholder
    title="Sewing Production"
    subtitle="Producción de costura diaria por línea y turno (output, WIP, rechazos, cumplimiento)"
    icon={<SewingIcon />}
    fields={fields}
    accent="success"
    note="Target Achievement %, Sewing Variance, Pending y Overproduction se calculan automáticamente."
  />
);

export default SewingProductionPage;
