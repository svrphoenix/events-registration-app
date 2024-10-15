'use client';

import { useEffect, useState } from 'react';
import { IEventResponse, IEventsParams } from '../apiInterfaces';
import { getEvents } from '@/services/api';
import { handleError } from '@/services/errorHandler';
import { toast } from 'react-toastify';

const useEvents = (page: number) => {
  const [events, setEvents] = useState<IEventResponse[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [isMoreData, setIsMoreData] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadEvents = async (page: number) => {
      const limit = 10; //to constants
      try {
        const params: IEventsParams = {
          limit: limit,
          skip: (page - 1) * limit,
        };
        setIsloading(true);
        const response = await getEvents(params);
        setEvents(prevEvents => [...prevEvents, ...response.data]);
        setIsMoreData(response.pageTotal > page);
      } catch (error) {
        const message: string = handleError(error);
        setIsError(true);
        toast.error(`Failed to load events: ${message}`);
      } finally {
        setIsloading(false);
      }
    };
    loadEvents(page);
  }, [page]);
  return { events, isLoading, isMoreData, isError };
};

export default useEvents;
