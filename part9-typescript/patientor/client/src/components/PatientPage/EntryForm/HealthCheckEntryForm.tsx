import { useState } from 'react';
import { useParams } from 'react-router-dom';
import entriesService from '../../../services/entries';
import { Entry, EntryWithoutId } from '../../../types';

interface HealthCheckEntryFormProps {
  onCancel: () => void;
  onSubmit: (entry: Entry) => void;
}

const HealthCheckEntryForm = ({
  onCancel,
  onSubmit,
}: HealthCheckEntryFormProps) => {
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
    const diagnosisCodesString = data.get('diagnosisCodes') as string;
    const healthCheckRating = parseInt(data.get('healthCheckRating') as string);

    const entry: EntryWithoutId = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating,
    };

    if (diagnosisCodesString) {
      entry.diagnosisCodes = diagnosisCodesString.split(',');
    }

    const res = await entriesService.createEntry(entry, id as string);
    if (res.status === 'success') {
      onSubmit(res.data);
      form.reset();
      setError(null);
    }

    if (res.status === 'error') {
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
          <label htmlFor="healthcheck-rating-input">Health Check Rating</label>
          <select
            id="healthcheck-rating-input"
            name="healthCheckRating"
            required
            defaultValue=""
          >
            <option value="" disabled>
              --Please choose an option--
            </option>
            <option value={0}>Healthy</option>
            <option value={1}>Low Risk</option>
            <option value={2}>High Risk</option>
            <option value={3}>Critical Risk</option>
          </select>
        </div>
        <div className="EntryForm-button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      {error && <div className="EntryForm-error">{error}</div>}
    </div>
  );
};

export default HealthCheckEntryForm;
