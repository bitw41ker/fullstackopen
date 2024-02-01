import express from 'express';
import diagnoses from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoses.getDiagnoses());
});

export default router;
