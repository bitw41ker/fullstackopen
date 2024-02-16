import { Gender, HealthCheckRating, DateRange, Discharge } from './types';
import diagnoses from '../data/diagnoses';

export const isValidString = (text: unknown): text is string => {
  return !!text && (typeof text === 'string' || text instanceof String);
};

export const isDate = (date: unknown): date is string => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  return isValidString(date) && regex.test(date);
};

export const isGender = (gender: unknown): gender is Gender => {
  return (
    isValidString(gender) &&
    (Object.values(Gender) as string[]).includes(gender)
  );
};

export const isObject = (obj: unknown): obj is object => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  return true;
};

export const isHealthCheckRating = (
  rating: unknown
): rating is HealthCheckRating => {
  return typeof rating === 'number' && rating >= 0 && rating <= 3;
};

export const isDateRange = (dateRange: unknown): dateRange is DateRange => {
  if (
    !isObject(dateRange) ||
    !('startDate' in dateRange) ||
    !('endDate' in dateRange)
  ) {
    return false;
  }
  return isDate(dateRange.startDate) && isDate(dateRange.endDate);
};

export const isDischarge = (discharge: unknown): discharge is Discharge => {
  if (
    !isObject(discharge) ||
    !('date' in discharge) ||
    !('criteria' in discharge)
  ) {
    return false;
  }
  return isDate(discharge.date) && isValidString(discharge.criteria);
};

export const isValidDiagnosisCode = (code: unknown): code is string => {
  return isValidString(code) && diagnoses.some((d) => d.code === code);
};
