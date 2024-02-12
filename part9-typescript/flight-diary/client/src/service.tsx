import { DiaryEntry, newDiaryEntry } from './types';

const DIARIES_URL = '/api/diaries';

export const getAllDiaryEntries = async (
  abortController: AbortController
): Promise<DiaryEntry[]> => {
  const res = await fetch(DIARIES_URL, {
    signal: abortController.signal,
  });

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  const data: DiaryEntry[] = await res.json();
  return data;
};

export const postDiaryEntries = (entry: newDiaryEntry) => {
  fetch(DIARIES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
};
