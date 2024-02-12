import { useState, useEffect } from 'react';
import { DiaryEntry as DiaryEntryType } from '../types';
import { getAllDiaryEntries } from '../service';

export const useDiaryEntries = (newEntry: object) => {
  const [entries, setEntries] = useState<DiaryEntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchEntries = async () => {
      try {
        const data: DiaryEntryType[] = await getAllDiaryEntries(
          abortController
        );

        setEntries(data);
        setLoading(false);
      } catch (error) {
        if (!abortController.signal.aborted) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Failed to fetch diary entries');
          }

          setLoading(false);
        }
      }
    };

    fetchEntries();

    return () => abortController.abort();
  }, [newEntry]);

  return { entries, loading, error };
};
