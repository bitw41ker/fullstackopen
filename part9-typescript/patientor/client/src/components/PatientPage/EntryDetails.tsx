import { Entry, assertNever, Diagnosis } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry diagnoses={diagnoses} entry={entry} />;
    case 'Hospital':
      return <HospitalEntry diagnoses={diagnoses} entry={entry} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry diagnoses={diagnoses} entry={entry} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
