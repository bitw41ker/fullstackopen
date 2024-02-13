import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from '../../services/patients';
import { Patient, Gender, Diagnosis } from '../../types';

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  const getDiagnosisDescription = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);

    return diagnosis ? diagnosis.name : '';
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

          <h3>Entries:</h3>

          <div>
            {patient.entries.map((e) => (
              <div key={e.id}>
                <div>
                  {e.date} {e.description}
                </div>
                <br />
                {e.diagnosisCodes && (
                  <ul>
                    {e.diagnosisCodes.map((dc) => (
                      <li key={dc}>
                        {dc} {getDiagnosisDescription(dc)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
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
