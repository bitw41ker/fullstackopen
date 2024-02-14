import {
  Diagnosis,
  HealthCheckEntry as HealthCheckEntryType,
} from '../../types';
import Diagnoses from './Diagnoses';

import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HealthCheckEntryProps {
  entry: HealthCheckEntryType;
  diagnoses: Diagnosis[];
}

const HEART_COLOR = ['#2f6e18', '#ffe603', '#ffa51f', '#ff2a1f'];

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  return (
    <section className="PatientPage-entry" key={entry.id}>
      <h4>
        {entry.date} <MonitorHeartIcon />
      </h4>

      <FavoriteIcon style={{ color: HEART_COLOR[entry.healthCheckRating] }} />

      <p> {entry.description}</p>
      <Diagnoses
        codes={entry.diagnosisCodes}
        diagnosesDescriptions={diagnoses}
      />
      <p>diagnose by {entry.specialist}</p>
    </section>
  );
};

export default HealthCheckEntry;
