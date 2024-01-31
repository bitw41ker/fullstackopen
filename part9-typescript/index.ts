import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const MISSING_PARAMS = 'parameters missing';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);

    res.send({
      height,
      weight,
      bmi,
    });
  } catch (error) {
    res.send({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises: dailyExcercises, target } = req.body;
    if (!dailyExcercises || !target) throw new Error(MISSING_PARAMS);

    const result = calculateExercises(
      dailyExcercises as number[],
      Number(target)
    );

    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === MISSING_PARAMS) {
        res.send({
          error: MISSING_PARAMS,
        });
      } else {
        res.send({
          error: 'malformatted parameters',
        });
      }
    } else {
      res.send({
        error: 'unknown error',
      });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
