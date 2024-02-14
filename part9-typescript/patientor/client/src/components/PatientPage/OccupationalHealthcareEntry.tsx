import {
  OccupationalHealthcareEntry as OccupationalHealthcareEntryType,
  Diagnosis,
} from '../../types';
import Diagnoses from './Diagnoses';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcareEntryType;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses,
}: OccupationalHealthcareProps) => {
  return (
    <section className="PatientPage-entry" key={entry.id}>
      <h4>
        {entry.date} <MedicalInformationIcon /> {entry.employerName}
      </h4>
      <p> {entry.description}</p>

      {entry.sickLeave && (
        <p>
          Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </p>
      )}

      <Diagnoses
        codes={entry.diagnosisCodes}
        diagnosesDescriptions={diagnoses}
      />

      <p>diagnose by {entry.specialist}</p>
    </section>
  );
};

export default OccupationalHealthcareEntry;
