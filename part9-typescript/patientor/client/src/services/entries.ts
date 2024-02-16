import axios from 'axios';
import { EntryWithoutId, Entry, Response } from '../types';
import { apiBaseUrl } from '../constants';

const createEntry = async (
  entry: EntryWithoutId,
  patientId: string
): Promise<Response> => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      entry
    );
    return {
      status: 'success',
      data: data as Entry,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        status: 'error',
        message: err.response?.data || 'Failed to create entry',
      };
    } else if (err instanceof Error) {
      return {
        status: 'error',
        message: err.message,
      };
    } else {
      return {
        status: 'error',
        message: 'Unknown error',
      };
    }
  }
};

export default {
  createEntry,
};
