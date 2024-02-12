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

export const postDiaryEntries = async (entry: newDiaryEntry) => {
  const res = await fetch(DIARIES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    if (res.status === 400) {
      const error = await res.text();
      return { error };
    } else {
      throw new Error('Failed to post');
    }
  }

  return res.json();
};
