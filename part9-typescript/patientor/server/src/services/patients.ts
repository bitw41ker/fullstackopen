import patients from '../../data/patients';
import { Patient, nonSensitivePatientData } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): nonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): Patient => {
  if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
    throw new Error('Missing fields');
  }

  const newPatient = {
    id: uuidv4(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
};
