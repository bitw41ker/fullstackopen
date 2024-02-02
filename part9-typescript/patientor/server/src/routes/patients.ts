import express from 'express';
import patientService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('Error: unknown error occurred.');
    }
  }
});

export default router;
