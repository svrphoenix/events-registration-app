import { IEventResponse } from '@/interfaces/apiInterfaces';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';

import Link from 'next/link';

import React from 'react';

interface EventCardProps {
  event: IEventResponse;
  openModal: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, openModal }) => {
  return (
    <Card
      className="min-w-[196px] max-w-[220px] bg-slate-400 cursor-pointer"
      shadow="md"
      radius="sm"
      fullWidth
      isHoverable
    >
      <CardHeader className="text-center text-lg font-bold">
        <h2>{event.title}</h2>
      </CardHeader>
      <Divider />
      <CardBody className="text-justify">
        <p className="text-md">{event.description}</p>
      </CardBody>
      <CardFooter className="flex flex-col gap-3">
        <div className="w-full flex flex-row justify-between font-bold">
          <p className="text-md">{event.organizer}</p>
          <p className="text-md">
            {event.eventDate.slice(0, 10).split('-').reverse().join('-')}
          </p>
        </div>
        <Divider />
        <div className="w-full flex flex-row justify-between font-s">
          <Button href={`/${event._id}`} as={Link} onPress={openModal}>
            Register
          </Button>
          <Button href={`/${event._id}/participants`} as={Link}>
            View
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
