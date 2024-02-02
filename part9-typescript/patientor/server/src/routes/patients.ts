import express from 'express';
import patientService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    const newPatient = patientService.addPatient(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dateOfBirth,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ssn,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      gender,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      occupation
    );

    res.json(newPatient);
  } catch (error: unknown) {
    res.status(400).send((error as Error).message);
  }
});

export default router;
