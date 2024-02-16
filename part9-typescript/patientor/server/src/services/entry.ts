import { v4 as uuidv4 } from 'uuid';
import {
  isValidString,
  isDischarge,
  isDate,
  isHealthCheckRating,
  isDateRange,
  isObject,
  isValidDiagnosisCode,
} from '../util';
import patients from '../../data/patients';
import {
  Entry,
  BaseEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  Diagnosis,
} from '../types';

const addEntry = (entry: unknown, patientId: string): Entry => {
  if (!isObject(entry) || !('type' in entry)) {
    throw new Error('Incorrect or missing data');
  }

  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error('Incorrect or missing patient');
  }

  let newEntry: Entry;

  switch (entry.type) {
    case 'HealthCheck':
      newEntry = createHealthCheckEntry(entry);
      break;

    case 'OccupationalHealthcare':
      newEntry = createOccupationalHealthcareEntry(entry);
      break;

    case 'Hospital':
      newEntry = createHospitalEntry(entry);
      break;

    default:
      throw new Error('Incorrect or missing type');
  }

  patient.entries.push(newEntry);

  return newEntry;
};

const createBaseEntry = (entry: object): BaseEntry => {
  if (
    !('description' in entry) ||
    !('date' in entry) ||
    !('specialist' in entry)
  ) {
    throw new Error('Incorrect data: some fields are missing');
  }

  const baeEntry: BaseEntry = {
    id: uuidv4(),
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
  };

  if ('diagnosisCodes' in entry) {
    baeEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  }

  return baeEntry;
};

const createHealthCheckEntry = (entry: object): HealthCheckEntry => {
  if (!('healthCheckRating' in entry)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }

  const baseEntry = createBaseEntry(entry);

  return {
    ...baseEntry,
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
  };
};

const parseHealthCheckRating = (
  rating: unknown
): HealthCheckEntry['healthCheckRating'] => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + rating);
  }
  return rating;
};

const createOccupationalHealthcareEntry = (
  entry: object
): OccupationalHealthcareEntry => {
  if (!('employerName' in entry)) {
    throw new Error('Incorrect or missing employerName');
  }

  const baseEntry = createBaseEntry(entry);
  const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
    ...baseEntry,
    type: 'OccupationalHealthcare',
    employerName: parseEmployerName(entry.employerName),
  };

  if ('sickLeave' in entry) {
    occupationalHealthcareEntry.sickLeave = parseSickLeave(entry.sickLeave);
  }

  return occupationalHealthcareEntry;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isValidString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const parseSickLeave = (
  sickLeave: unknown
): OccupationalHealthcareEntry['sickLeave'] => {
  if (!isDateRange(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave');
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const createHospitalEntry = (entry: object): HospitalEntry => {
  if (!('discharge' in entry)) {
    throw new Error('Incorrect or missing discharge');
  }

  const baseEntry = createBaseEntry(entry);
  const hospitalEntry: HospitalEntry = {
    ...baseEntry,
    type: 'Hospital',
    discharge: parseDischarge(entry.discharge),
  };

  return hospitalEntry;
};

const parseDischarge = (discharge: unknown): HospitalEntry['discharge'] => {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};

const parseCriteria = (criteria: unknown): string => {
  if (!isValidString(criteria)) {
    throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return criteria;
};

const parseDiagnosisCodes = (arr: unknown): Array<Diagnosis['code']> => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Incorrect or missing diagnosisCodes');
  }

  arr.forEach((code) => {
    if (!isValidDiagnosisCode(code)) {
      throw new Error('Incorrect diagnosis code: ' + code);
    }
  });

  return arr as Array<Diagnosis['code']>;
};

const parseDate = (date: unknown): string => {
  if (!isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseDescription = (description: unknown): string => {
  if (!isValidString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isValidString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

export default {
  addEntry,
};
