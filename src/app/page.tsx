import { FC } from 'react';
import EventList from './components/EventList/EventList';
import Title from './components/Title/Title';

const Home: FC = () => {
  return (
    <div className="max-w-7xl">
      <Title text="Events list" />
      <EventList />
    </div>
  );
};

export default Home;
