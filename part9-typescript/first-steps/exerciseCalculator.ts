interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const RATINGS = [
  { rating: 1, description: 'bad' },
  { rating: 2, description: 'not too bad but could be better' },
  { rating: 3, description: 'good' },
];

const validate = (hours: number[], target: number): void => {
  if (
    !Array.isArray(hours) ||
    hours.length === 0 ||
    Number.isNaN(target) ||
    target < 0
  ) {
    throw Error('Wrong argument types!');
  }
};

const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResult => {
  validate(hours, target);

  const periodLength = hours.length;
  let trainingDays = 0;
  let rating = RATINGS[0].rating;
  let ratingDescription = RATINGS[0].description;
  let sum = 0;

  for (const hour of hours) {
    if (typeof hour != 'number') throw Error('Wrong argument types!');

    if (hour > 0) {
      trainingDays++;
      sum += hour;
    }
  }

  const average = sum / periodLength;
  const success = average >= target;

  if (average >= target) {
    rating = RATINGS[2].rating;
    ratingDescription = RATINGS[2].description;
  } else if (average >= target - 0.5) {
    rating = RATINGS[1].rating;
    ratingDescription = RATINGS[1].description;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export default calculateExercises;
