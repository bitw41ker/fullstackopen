import DiaryEntry from './DiaryEntry';
import { useDiaryEntries } from '../hooks/useFetchDiaryEntries';

interface DiaryEntriesProps {
  newDiaryEntry: object;
}

const DiaryEntries = ({ newDiaryEntry }: DiaryEntriesProps) => {
  const { entries, loading, error } = useDiaryEntries(newDiaryEntry);
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
