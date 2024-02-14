import { HospitalEntry as HospitalEntryType, Diagnosis } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Diagnoses from './Diagnoses';

interface HospitalEntryProps {
  entry: HospitalEntryType;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <section className="PatientPage-entry" key={entry.id}>
      <h4>
        {entry.date} <LocalHospitalIcon />
      </h4>
      <p> {entry.description}</p>
      <Diagnoses
        codes={entry.diagnosisCodes}
        diagnosesDescriptions={diagnoses}
      />

      <p>
        Discharge: {entry.discharge.date} - {entry.discharge.criteria}
      </p>
      <p>diagnose by {entry.specialist}</p>
    </section>
  );
};

export default HospitalEntry;
