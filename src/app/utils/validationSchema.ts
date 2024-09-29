import { IParticipantSchema, SOURCE } from '@/interfaces/formInterfaces';
import { DateValue } from '@nextui-org/react';
import * as Yup from 'yup';

export const participantValidationSchema: Yup.Schema<IParticipantSchema> = Yup.object({
  fullName: Yup.string().required('Full name is required').min(2).max(30),
  email: Yup.string().email('Invalid email address').max(30).required('Email is required'),
  birthDate: Yup.mixed<DateValue>().required(),
  eventSource: Yup.mixed<SOURCE>().required().oneOf(Object.values(SOURCE)),
});
