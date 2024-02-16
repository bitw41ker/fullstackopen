import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import { EntryForm, Entry } from '../../../types';

import './index.css';

interface EntryFormProps {
  formType: EntryForm | null;
  onSubmit: (entry: Entry) => void;
  onCancel: () => void;
}

const EntryFrom: React.FC<EntryFormProps> = ({
  formType,
  onCancel,
  onSubmit,
}) => {
  switch (formType) {
    case 'HealthCheck':
      return <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryForm />;
    case 'Hospital':
      return <HospitalEntryForm />;
    default:
      return null;
  }
};

export default EntryFrom;
