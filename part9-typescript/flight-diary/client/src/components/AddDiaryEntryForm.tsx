import { postDiaryEntries } from '../service';
import { useState } from 'react';

const AddDiaryEntryForm = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const date = formData.get('date-input') as string;
    const visibility = formData.get('visibility-input') as string;
    const weather = formData.get('weather-input') as string;
    const comment = formData.get('comment-input') as string;

    const data = await postDiaryEntries({ date, visibility, weather, comment });
    if (!data.error) {
      form.reset();
      setError(null);
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
        <input id="date-input" name="date-input" />
        <br />
        <label htmlFor="visibility-input">visibility </label>
        <input id="visibility-input" name="visibility-input" />
        <br />
        <label htmlFor="weather-input">weather </label>
        <input id="weather-input" name="weather-input" />
        <br />
        <label htmlFor="comment-input">comment </label>
        <input id="comment-input" name="comment-input" />
        <br />
        <button>add</button>
      </form>
    </>
  );
};

export default AddDiaryEntryForm;
