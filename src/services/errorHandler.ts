'use client';

import axios from 'axios';

export const handleError = (error: unknown): string => {
  let message;
  if (error === null) message = 'Unrecoverable error!! Error is null!';
  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ||
      'An error occurred while querying to the backend service!';
  } else {
    message = (error as Error).message || 'An unexpected error occurred!';
  }
  return message;
};
