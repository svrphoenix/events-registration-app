'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Spinner } from '@nextui-org/react';
import { getParticipantsByEventId } from '@/services/api';
import { IParticipantResponse } from '@/interfaces/apiInterfaces';
import { handleError } from '@/services/errorHandler';
import { toast } from 'react-toastify';

interface IParticipantListProps {
  eventId: string;
}

const ParticipantList: FC<IParticipantListProps> = ({ eventId }) => {
  const [participants, setParticipants] = useState<IParticipantResponse[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getParticipants = useCallback(async (id: string) => {
    try {
      setIsloading(true);
      const response = await getParticipantsByEventId(id);
      setParticipants([...response]);
      if (response.length === 0) toast.warning('No participants found for this event');
    } catch (error) {
      const message: string = handleError(error);
      setIsError(true);
      toast.error(`Failed to load participants: ${message}`);
    } finally {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    getParticipants(eventId);
  }, [eventId, getParticipants]);

  if (!isError)
    return isLoading ? (
      <div className="flex justify-center">
        <Spinner label="Loading..." color="default" labelColor="secondary" />
      </div>
    ) : (
      <div className="py-8 px-10 ">
        <ul className="gap-3 grid grid-cols-3 sm:grid-cols-5 auto-rows-fr mb-5">
          {participants.map((participant: IParticipantResponse) => (
            <li key={participant._id} className="flex text-sm font-light text-gray-900">
              <Card
                className="bg-slate-400 cursor-pointer"
                shadow="md"
                radius="sm"
                fullWidth
                isHoverable
              >
                <CardHeader className="text-center text-lg font-bold">
                  <h2>{participant.fullName}</h2>
                </CardHeader>
                <Divider />
                <CardBody className="text-justify">
                  <p className="text-md">{participant.email}</p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default ParticipantList;
