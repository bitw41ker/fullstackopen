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
  { rating: 1, description: 'poor' },
  { rating: 2, description: 'not too bad but could be better' },
  { rating: 3, description: 'good' },
];

const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResult => {
  if (
    !Array.isArray(hours) ||
    hours.length === 0 ||
    typeof target != 'number' ||
    target < 0
  ) {
    throw Error('Wrong argument types!');
  }

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

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log('Error: ', e.message);
  } else {
    console.log('Error: ', e);
  }
}
