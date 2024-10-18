'use client';

import { FC, useState } from 'react';
import { IEventResponse } from '@/interfaces/apiInterfaces';
import { Pagination, Spinner, useDisclosure } from '@nextui-org/react';
import EventCard from '../EventCard/EventCard';
import useEvents from '@/app/hooks/useEvents';

const EventList: FC = () => {
  const [page, setPage] = useState(1);
  const { events, isError, isLoading, total } = useEvents(page);
  const { onOpen: openModal } = useDisclosure();

  if (!isError) {
    return (
      <>
        <div className="py-8 px-10 flex flex-col items-center">
          <ul className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr mb-5">
            {events.map((event: IEventResponse) => (
              <li
                key={event._id}
                className="flex text-sm font-light text-gray-900"
              >
                <EventCard event={event} openModal={openModal} />
              </li>
            ))}
          </ul>
          {isLoading ? (
            <Spinner
              label="Loading..."
              color="default"
              labelColor="secondary"
            />
          ) : (
            <Pagination
              showShadow
              showControls
              total={total}
              page={page}
              onChange={setPage}
            />
          )}
        </div>
      </>
    );
  }
};

export default EventList;
