import patients from '../../data/patients';
import { Patient, nonSensitivePatientData } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { isValidString, isDate, isGender } from '../util';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | null => {
  const patient = patients.find((p) => p.id === id);

  return patient || null;
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

const addPatient = (obj: unknown): Patient => {
  const newPatient = createPatient(obj);
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatientData,
  addPatient,
};

const createPatient = (patient: unknown): Patient => {
  if (!patient || typeof patient !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    !('name' in patient) ||
    !('dateOfBirth' in patient) ||
    !('ssn' in patient) ||
    !('gender' in patient) ||
    !('occupation' in patient)
  ) {
    throw new Error('Incorrect data: some fields are missing');
  }

  return {
    id: uuidv4(),
    name: parseName(patient.name),
    dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
    ssn: parseSsn(patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseOccupation(patient.occupation),
    entries: [],
  };
};

const parseName = (name: unknown): string => {
  if (!isValidString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isValidString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isValidString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseGender = (gender: unknown): string => {
  if (!isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};
