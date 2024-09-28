'use server';

import axios from 'axios';

import { IEventResponse, IEventsParams, IPaginatedResponse } from '@/interfaces/requestInterfaces';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

export const getEvents = async (
  params: IEventsParams
): Promise<IPaginatedResponse<IEventResponse>> => {
  const { data } = await instance.get<IPaginatedResponse<IEventResponse>>('/events', {
    params,
  });
  return data;
};
