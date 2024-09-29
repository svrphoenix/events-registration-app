import { SOURCE } from './formInterfaces';

export interface IEventResponse {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  countTotal: number;
  pageTotal: number;
}

export interface IEventsParams {
  skip?: number;
  limit?: number;
}

export interface IParticipantResponse {
  _id: string;
  fullName: string;
  email: string;
  birthDate: Date;
}

export interface IParticipantRequest {
  fullName: string;
  email: string;
  birthDate: Date;
  events: [
    {
      eventId: string;
      eventSource: SOURCE;
    }
  ];
}
