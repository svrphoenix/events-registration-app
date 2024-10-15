'use client';

import axios from 'axios';

import {
  IEventResponse,
  IEventsParams,
  IPaginatedResponse,
  IParticipantRequest,
  IParticipantResponse,
} from '@/interfaces/apiInterfaces';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const getEvents = async (
  params: IEventsParams
): Promise<IPaginatedResponse<IEventResponse>> => {
  const { data } = await instance.get<IPaginatedResponse<IEventResponse>>(
    '/events',
    {
      params,
    }
  );
  return data;
};

export const getParticipantsByEventId = async (
  eventId: string
): Promise<IParticipantResponse[]> => {
  const { data } = await instance.get<IParticipantResponse[]>(
    '/participants/eventid',
    {
      params: { id: eventId },
    }
  );
  return data;
};

export const addParticipant = async (
  newParticipant: IParticipantRequest
): Promise<IPaginatedResponse<IEventResponse>> => {
  const { data } = await instance.post<IPaginatedResponse<IEventResponse>>(
    '/participants',
    newParticipant
  );
  return data;
};
