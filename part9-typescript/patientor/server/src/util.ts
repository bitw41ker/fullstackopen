import { Gender } from './types';

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
