import DiaryEntry from './DiaryEntry';
import { useDiaryEntries } from '../hooks/useFetchDiaryEntries';

const DiaryEntries = () => {
  const { entries, loading, error } = useDiaryEntries();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Diary Entries</h2>

      {entries.map((entry) => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </section>
  );
};

export default DiaryEntries;
