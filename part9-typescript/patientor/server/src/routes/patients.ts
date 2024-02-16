import express from 'express';
import patientService from '../services/patients';
import entryService from '../services/entry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatientById(req.params.id));
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

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = entryService.addEntry(req.body, req.params.id);
    res.json(newEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('Error: unknown error occurred.');
    }
  }
});

export default router;
