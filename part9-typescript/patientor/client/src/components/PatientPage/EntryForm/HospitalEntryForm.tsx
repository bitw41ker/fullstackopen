import { useState } from 'react';
import { useParams } from 'react-router-dom';

import entriesService from '../../../services/entries';
import { Entry, EntryWithoutId } from '../../../types';
interface HospitalEntryFormProps {
  onCancel: () => void;
  onSubmit: (entry: Entry) => void;
}

const HospitalEntryForm = ({ onSubmit, onCancel }: HospitalEntryFormProps) => {
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
    const dischargeDate = data.get('dischargeDate') as string;
    const dischargeCriteria = data.get('dischargeCriteria') as string;
    const diagnosisCodesString = data.get('diagnosisCodes') as string;

    const entry: EntryWithoutId = {
      type: 'Hospital',
      description,
      date,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };

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
          <label htmlFor="description-input">Description</label>
          <input id="description-input" name="description" required />
        </div>
        <div>
          <label htmlFor="date-input">Date</label>
          <input id="date-input" name="date" type="date" required />
        </div>
        <div>
          <label htmlFor="specialist-input">Specialist</label>
          <input id="specialist-input" name="specialist" required />
        </div>
        <div>
          <label htmlFor="diagnosisCodes-input">Diagnosis Codes</label>
          <input id="diagnosisCodes-input" name="diagnosisCodes" />
        </div>
        <div>
          <label htmlFor="dischargeDate-input">Discharge Date</label>
          <input
            id="dischargeDate-input"
            name="dischargeDate"
            type="date"
            required
          />
        </div>
        <div>
          <label htmlFor="dischargeCriteria-input">Discharge Criteria</label>
          <input
            id="dischargeCriteria-input"
            name="dischargeCriteria"
            required
          />
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

export default HospitalEntryForm;
