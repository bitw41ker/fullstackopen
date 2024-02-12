import { postDiaryEntries } from '../service';
import { useState } from 'react';

const VISIBILITY = ['great', 'good', 'ok', 'poor'];

const WEATHER = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];

interface AddDiaryEntryFormProps {
  setNewEntry: React.Dispatch<React.SetStateAction<object>>;
}

const AddDiaryEntryForm = ({ setNewEntry }: AddDiaryEntryFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const date = String(formData.get('date'));
    const visibility = String(formData.get('visibility'));
    const weather = String(formData.get('weather'));
    const comment = String(formData.get('comment'));

    const data = await postDiaryEntries({ date, visibility, weather, comment });
    if (!data.error) {
      form.reset();
      setError(null);
      setNewEntry(data);
    } else {
      setError(data.error);
    }
  };

  return (
    <>
      <h2>Add New Entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="date-input">date </label>
        <input type="date" id="date-input" name="date" />
        <br />

        <fieldset>
          <legend>Visibility</legend>
          {VISIBILITY.map((v) => (
            <div key={v}>
              <input
                type="radio"
                id={`visibility-${v}`}
                name="visibility"
                value={`${v}`}
              />
              <label htmlFor={`visibility-${v}`}>{v}</label>
              <br />
            </div>
          ))}
        </fieldset>
        <br />

        <fieldset>
          <legend>Weather</legend>
          {WEATHER.map((w) => (
            <div key={w}>
              <input
                type="radio"
                id={`weather-${w}`}
                name="weather"
                value={`${w}`}
              />
              <label htmlFor={`weather-${w}`}>{w}</label>
              <br />
            </div>
          ))}
        </fieldset>
        <br />

        <label htmlFor="comment-input">comment </label>
        <input id="comment-input" name="comment" />
        <br />

        <button>add</button>
      </form>
    </>
  );
};

export default AddDiaryEntryForm;
