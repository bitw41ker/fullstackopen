import { useState } from 'react';
import { useParams } from 'react-router-dom';

import entriesService from '../../../services/entries';
import { Entry, EntryWithoutId } from '../../../types';

interface OccupationalHealthcareEntryFormProps {
  onCancel: () => void;
  onSubmit: (entry: Entry) => void;
}

const OccupationalHealthcareEntryForm = ({
  onSubmit,
  onCancel,
}: OccupationalHealthcareEntryFormProps) => {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      setError('Patient id is missing');
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const description = data.get('description') as string;
    const date = data.get('date') as string;
    const specialist = data.get('specialist') as string;
    const employerName = data.get('employerName') as string;
    const sickLeaveStartDate = data.get('sickLeaveStartDate') as string;
    const sickLeaveEndDate = data.get('sickLeaveEndDate') as string;
    const diagnosisCodesString = data.get('diagnosisCodes') as string;

    if (
      (sickLeaveStartDate && !sickLeaveEndDate) ||
      (!sickLeaveStartDate && sickLeaveEndDate)
    ) {
      setError('Sickleave start and end dates are required');
      return;
    }

    const entry: EntryWithoutId = {
      type: 'OccupationalHealthcare',
      description,
      date,
      specialist,
      employerName,
    };

    if (sickLeaveStartDate && sickLeaveEndDate) {
      entry.sickLeave = {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
      };
    }

    if (diagnosisCodesString) {
      entry.diagnosisCodes = diagnosisCodesString.split(',');
    }

    const res = await entriesService.createEntry(entry, id);
    if (res.status === 'success') {
      onSubmit(res.data);
      form.reset();
      setError(null);
    } else if (res.status === 'error') {
      if (res.message) setError(res.message);
    }
  };

  return (
    <div>
      <form onSubmit={formSubmit} className="EntryForm-input-form">
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div>
          <label htmlFor="specialist">Specialist</label>
          <input type="text" id="specialist" name="specialist" required />
        </div>
        <div>
          <label htmlFor="employerName">Employer name</label>
          <input type="text" id="employerName" name="employerName" required />
        </div>
        <div>
          <label htmlFor="sickLeaveStartDate">Sick leave start date</label>
          <input
            type="date"
            id="sickLeaveStartDate"
            name="sickLeaveStartDate"
          />
        </div>
        <div>
          <label htmlFor="sickLeaveEndDate">Sick leave end date</label>
          <input type="date" id="sickLeaveEndDate" name="sickLeaveEndDate" />
        </div>
        <div>
          <label htmlFor="diagnosisCodes">Diagnosis codes</label>
          <input type="text" id="diagnosisCodes" name="diagnosisCodes" />
        </div>
        <div>
          <button type="submit">Add</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </form>
      {error && <div className="EntryForm-error">{error}</div>}
    </div>
  );
};

export default OccupationalHealthcareEntryForm;
