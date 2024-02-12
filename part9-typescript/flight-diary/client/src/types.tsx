export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type newDiaryEntry = Omit<DiaryEntry, 'id'>;
