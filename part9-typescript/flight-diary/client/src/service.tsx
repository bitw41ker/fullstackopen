import { DiaryEntry } from './types';

const DIARIES_URL = '/api/diaries';

export async function getAllDiaryEntries(
  abortController: AbortController
): Promise<DiaryEntry[]> {
  const res = await fetch(DIARIES_URL, {
    signal: abortController.signal,
  });

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  const data: DiaryEntry[] = await res.json();
  return data;
}
