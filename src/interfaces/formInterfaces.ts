import { DateValue } from "@nextui-org/react";

export enum SOURCE {
  SOCIAL = 'Social',
  FRIENDS = 'Friends',
  MYSELF = 'Myself',
}

export interface IParticipantSchema {
  fullName: string;
  email: string;
  birthDate: DateValue;
  eventSource: SOURCE;
}

export interface IFormValues {
  fullName: string;
  email: string;
  birthDate: Date;
  events: [{ eventSource: SOURCE }];
}
