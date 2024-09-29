import MyModal from '@/app/components/Modal/MyModal';
import { FC } from 'react';

interface IRegisterParticipantProps {
  params: {
    id: string;
  };
}

const RegisterParticipant: FC<IRegisterParticipantProps> = ({ params }) => {
  return <MyModal eventId={params.id}></MyModal>;
};

export default RegisterParticipant;
