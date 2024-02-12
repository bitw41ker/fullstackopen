import { DiaryEntry as DiaryEntryType } from '../types';

interface DiaryEntriesProps {
  entry: DiaryEntryType;
}

const DiaryEntry = ({ entry }: DiaryEntriesProps) => {
  return (
    <article>
      <h3>{entry.date}</h3>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
    </article>
  );
};

export default DiaryEntry;
