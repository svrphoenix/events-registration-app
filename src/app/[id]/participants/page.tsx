import { FC } from 'react';
import Title from '../../components/Title/Title';
import ParticipantList from '../../components/ParticipantList/ParticipantList';

interface IpageProps {
  params: { id: string };
}

const Page: FC<IpageProps> = ({ params: { id } }) => {
  return (
    <div className="max-w-7xl">
      <Title text="Participants list" />
      <ParticipantList eventId={id} />
    </div>
  );
};

export default Page;
