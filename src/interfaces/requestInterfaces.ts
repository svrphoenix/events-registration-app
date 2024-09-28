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
