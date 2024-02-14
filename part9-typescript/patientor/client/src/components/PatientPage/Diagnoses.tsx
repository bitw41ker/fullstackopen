import { Diagnosis } from '../../types';

interface Diagnoses {
  diagnosesDescriptions: Diagnosis[];
  codes: string[] | undefined | null;
}

const Diagnoses = ({ codes, diagnosesDescriptions }: Diagnoses) => {
  return codes ? (
    <ul>
      {codes.map((code) => (
        <li key={code}>
          {code} {getDiagnosisDescription(code, diagnosesDescriptions)}
        </li>
      ))}
    </ul>
  ) : null;
};

export default Diagnoses;

const getDiagnosisDescription = (code: string, diagnoses: Diagnosis[]) => {
  const diagnosis = diagnoses.find((d) => d.code === code);

  return diagnosis ? diagnosis.name : '';
};
