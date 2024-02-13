import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from '../../services/patients';
import { Patient, Gender } from '../../types';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        const patient = await patientService.getById(id);
        setPatient(patient);
      }
    };

    void getPatient();
  });

  return (
    <article>
      {patient && (
        <>
          <h2>
            {patient.name} {getGenderIcon(patient.gender)}
          </h2>

          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
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
