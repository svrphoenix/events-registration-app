'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { getEvents } from '@/services/api';
import { IEventResponse, IEventsParams } from '@/interfaces/requestInterfaces';
import LoadMore from '../Buttons/LoadMore/LoadMore';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner,
} from '@nextui-org/react';
import { handleError } from '@/services/errorHandler';
import { toast } from 'react-toastify';

const EventList: FC = () => {
  const [events, setEvents] = useState<IEventResponse[]>([]);
  const [isMoreData, setIsMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadEvents = useCallback(async (page: number) => {
    const limit = 10; //to constants
    try {
      const params: IEventsParams = {
        limit: limit,
        skip: (page - 1) * limit,
      };
      setIsloading(true);
      const response = await getEvents(params);
      setEvents(prevEvents => [...prevEvents, ...response.data]);
      setIsMoreData(response.pageTotal > page);
    } catch (error) {
      const message: string = handleError(error);
      setIsError(true);
      toast.error(`Failed to load events: ${message}`);
    } finally {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setEvents([]);
    loadEvents(1);
  }, [loadEvents]);

  const loadMoreEvents = (): void => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadEvents(nextPage);
  };

  if (!isError)
    return (
      <div className="py-8 px-10 ">
        <ul className="gap-3 grid grid-cols-3 sm:grid-cols-5 auto-rows-fr mb-5">
          {events.map((event: IEventResponse) => (
            <li key={event._id} className="flex text-sm font-light text-gray-900">
              <Card
                className="bg-slate-400 cursor-pointer"
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
                    <Button>Register</Button>
                    <Button>View</Button>
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
        {isLoading ? (
          <Spinner label="Loading..." color="default" labelColor="secondary" />
        ) : (
          <LoadMore enabled={isMoreData} handleClick={loadMoreEvents} />
        )}
      </div>
    );
};

export default EventList;
