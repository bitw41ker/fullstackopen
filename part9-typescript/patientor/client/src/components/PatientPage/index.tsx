import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from '../../services/patients';
import EntryDetails from './EntryDetails';
import EntryFrom from './EntryForm';
import { Patient, Gender, Diagnosis, EntryForm, Entry } from '../../types';
import './index.css';

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient>();
  const [selectedEntry, setSelectedEntry] = useState<EntryForm | null>(null);
  const { id } = useParams();

  const addEntry = (entry: Entry) => {
    if (patient) {
      patient.entries.push(entry);
      setPatient({ ...patient });
    }
  };

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        const patient = await patientService.getById(id);
        setPatient(patient);
      }
    };

    void getPatient();
  }, [id]);

  return (
    <article>
      {patient && (
        <>
          <h2>
            {patient.name} {getGenderIcon(patient.gender)}
          </h2>

          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>

          <section>
            <h3>Add new entry</h3>

            {!selectedEntry && (
              <button onClick={() => setSelectedEntry('HealthCheck')}>
                Health Check
              </button>
            )}
            <EntryFrom
              formType={selectedEntry}
              onSubmit={addEntry}
              onCancel={() => setSelectedEntry(null)}
            />
          </section>

          <section>
            <h3>Entries:</h3>

            {patient.entries.map((e) => (
              <EntryDetails entry={e} diagnoses={diagnoses} key={e.id} />
            ))}
          </section>
        </>
      )}
    </article>
  );
};

const getGenderIcon = (gender: Gender) => {
  if (gender === 'male') return <MaleIcon />;

  if (gender === 'female') return <FemaleIcon />;

  return <TransgenderIcon />;
};

export default PatientPage;
