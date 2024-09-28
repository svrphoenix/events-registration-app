import { FC } from 'react';
import EventList from './components/EventList/EventList';

const Home: FC = () => {
  return (
    <main className="flex flex-col items-center min-h-screen h-auto max-w-7xl  mx-auto bg-slate-800">
      <h1 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight py-5">
        Events list
      </h1>
      <EventList />
    </main>
  );
};

export default Home;
